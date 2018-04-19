export default function(sequelize, DataTypes){
	const Post = sequelize.define('Post', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false
		},
		authorId: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	return Post;
}