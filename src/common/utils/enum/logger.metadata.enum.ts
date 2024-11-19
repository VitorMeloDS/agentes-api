export class LoggerMetadata {
	public static readonly Log = new LoggerMetadata('log', 'green', console.info);
	public static readonly Warn = new LoggerMetadata('warn', 'magenta', console.warn);
	public static readonly Error = new LoggerMetadata('error', 'red', console.error);

	private constructor(
		public readonly name: string,
		public readonly color: string,
		public readonly procedure: Function,
	) {}

	public toString(): string {
		return this.name.toUpperCase();
	}
}
