let roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('repair');
        }

        if(creep.memory.repairing) {
            let repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });

            if(repairTargets.length) {
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: 'blue'}});
                }
                
            }
            
            else {
                let buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(buildTargets.length) {
                    if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: 'pink'}});
                    }
                    
                } 
                else {
                    creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: 'purple'}});
                    creep.say('DOET NIKS');
                }
            }
        } 
        
        else {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: 'yellow'}});
            }
        }
    }
};

module.exports = roleRepairer;