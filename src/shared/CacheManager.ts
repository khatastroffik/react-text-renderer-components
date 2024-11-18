/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Type alias for constructor functions
 */
export type Ctor<U> = new (...args: any[]) => U;


/**
 * A factory function to create object instances of any kind, using the object constructor.
 * 
 * @param ctor Type of the object to be constructed
 * @param args Arguments to be passed to the constructor of the object
 * @returns A new instance of the object
 */
function factory<T>(ctor: Ctor<T>, ...args: any[]): T {
    // console.log("FACTORY ARGS: ", ...args);
    return new ctor(...args);
}

/**
 * Retrieve an instance of a given object type (identified by a unique key) from a dedicated cache.
 * If the instance does not already exist, it will be automatically created and added to the cache.
 * 
 * @param cache The storage object containing the cached object instances
 * @param ctor The type of object to be stored in the cache
 * @param ctorParams The arguments passed to the constructor of the stored object type when the 
 * corresponding instance does not already exist i.e. is not already cached.
 * Important: the arguments are used to build the unique key identifying a specific object instance!
 * Hence the combination of all arguments needs to be serialisable and unique.
 * @returns the unique instance of the object type corresponding to the unique key built out of the
 * construction arguments.
 * Note: the instance is automatically added to the cache and cannot be removed from it.
 */
export const getFromCache = <T>(cache: unknown, ctor: Ctor<T>, ...ctorParams: ConstructorParameters<Ctor<T>>): T => {
    return (cache as any)[Symbol.for(JSON.stringify(ctorParams))] ??= factory(ctor, ...ctorParams);
};

