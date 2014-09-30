module.exports = function(sequelize, DataTypes) {
  var Alert = sequelize.define('Alert', {
      aid      : { type : DataTypes.INTEGER, allowNull: false ,primaryKey : true, autoIncrement : true },
      patient  : DataTypes.STRING,
      level    : DataTypes.ENUM("RED","YELLOW","GREEN"),
      title    : DataTypes.STRING,
      employee : DataTypes.STRING,
      note_id  : DataTypes.INTEGER
    }, {
    classMethods: {
      associate: function(models) {
        Alert.belongsTo(models.Note);
      }
    },
    timestamps: true,
    underscored: true,
    tableName : 'alerts'
  })
 
  return Alert
}
