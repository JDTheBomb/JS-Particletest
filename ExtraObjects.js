Object.assignProperties = function(target, properties){
    Object.keys(properties).forEach(key => {
        const descriptor = Object.getOwnPropertyDescriptor(properties, key);
        Object.defineProperty(target, key, descriptor);
    });
}