async function deepResolvePromises<T>(input: T): Promise<Awaited<T>> {
  if (input instanceof Promise) {
    return (await input) as Awaited<T>;
  }

  if (Array.isArray(input)) {
    const resolvedArray = await Promise.all(input.map(deepResolvePromises));
    return resolvedArray as Awaited<T>;
  }

  if (input instanceof Date) {
    return input as Awaited<T>;
  }

  if (typeof input === 'object' && input !== null) {
    const typedInput = input as Record<string, unknown>;
    const keys = Object.keys(input);
    const resolvedObject: { [key: string]: Awaited<T> } = {};
    for (const key of keys) {
      const resolvedValue: Awaited<T> = await deepResolvePromises(
        typedInput[key] as T,
      );
      resolvedObject[key] = resolvedValue;
    }

    return resolvedObject as Awaited<T>;
  }

  return input as Awaited<T>;
}

export default deepResolvePromises;
