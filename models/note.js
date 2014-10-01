module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define('Note', {
      id     : { type : DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      title  : DataTypes.STRING,
      body   : DataTypes.TEXT
    }, {
    classMethods: {
      associate: function(models) {
        Note.hasOne(models.Alarm);
      }
    },
    timestamps: true,
    underscored: true,
    tableName: 'notes'
  })
 
  return Note
}
