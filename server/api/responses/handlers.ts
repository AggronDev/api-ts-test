
import {Request, Response,  ErrorRequestHandler, NextFunction} from 'express';
import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';



const config = require('../../config/env/config')();

class Handlers {

	authFail(req: Request, res: Response) {
    	return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    authSuccess(res: Response, credentials: any, data: any){
	const isMatch = bcrypt.compareSync(credentials.password, data.password);

	if(isMatch){
		const payload = {id: data.id};
		res.json({
			token: jwt.encode(payload, config.secret)
		});
	} else {
			res.sendStatus(HTTPStatus.UNAUTHORIZED);
		}
	}

	onError(res: Response, message: string, err: any) {
    	console.log(`Error: ${err}`);
    	return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
	}

	onSuccess(res: Response, data: any) {
	    return res.status(HTTPStatus.OK).json({payload: data});
	}

	errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction){
    	console.error('API error handlerffoi executa: ${err}');
    		res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Erro Interno do Servidor'
    	})
	}

	dbErroHandler(res: Response, err: any) {
    	console.log(`Erro dbHandler: ${err}`);
    	res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        	code: 'ERR-01',
        	message: 'Erro ao criar Usuario'
    	});
	}
}
export default new Handlers();