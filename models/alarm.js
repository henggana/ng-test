module.exports = function(sequelize, DataTypes) {
  var Alarm = sequelize.define('Alarm', {
      aid      : { type : DataTypes.INTEGER, allowNull: false ,primaryKey : true, autoIncrement : true },
      patient  : DataTypes.STRING,
      level    : DataTypes.ENUM("RED","YELLOW","GREEN"),
      title    : DataTypes.STRING,
      employee : DataTypes.STRING,
      note_id  : DataTypes.INTEGER
    }, {
    classMethods: {
      associate: function(models) {
        Alarm.belongsTo(models.Note);
      }
    },
    timestamps: true,
    underscored: true,
    tableName : 'alarms'
  })
 
  return Alarm
}
