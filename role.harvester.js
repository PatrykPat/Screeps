let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            // Zoek naar dropped resources
            let droppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (resource) => {
                    return resource.resourceType === RESOURCE_ENERGY;
                }
            });

            // Zoek naar tombstones met energie
            let tombstones = creep.room.find(FIND_TOMBSTONES, {
                filter: (tombstone) => {
                    return tombstone.store[RESOURCE_ENERGY] > 0;
                }
            });

            if(tombstones.length > 0) {
                // Als er tombstones met energie zijn, loot deze eerst
                if(creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombstones[0], {visualizePathStyle: {stroke: 'white'}});
                }
            } else if(droppedResources.length > 0) {
                // Als er dropped resources zijn, verzamel deze eerst
                if(creep.pickup(droppedResources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedResources[0], {visualizePathStyle: {stroke: 'yellow'}});
                }
            } else {
                // Als er geen dropped resources zijn, ga dan naar de bron
                let sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: 'red'}});
                }
            }
        } else {
            // Zoek naar structuren die energie kunnen opslaan
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'lime'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;