export function safelyIterateConfig(config: unknown): void {
  if (config && typeof config === "object" && Symbol.iterator in config) {
    for (const item of config as Iterable<unknown>) {
      console.log(item);
    }
  } else {
    console.error("Config is not iterable:", config);
  }
}
