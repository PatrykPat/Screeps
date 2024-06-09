let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#FF0000'}});
                }
            }
            else {
                let roadToRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType === STRUCTURE_ROAD && object.hits < object.hitsMax;
                    } 
                });

                if (roadToRepair) {
                    if(creep.repair(roadToRepair) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roadToRepair, {visualizePathStyle: {stroke: '#00FF00'}});
                    }
                    creep.say('repair');
                } else {
                    creep.moveTo(Game.spawns['Spawn1']);
                    creep.say('niks te doen');
                }
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;