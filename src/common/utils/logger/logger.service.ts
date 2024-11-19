import * as winston from 'winston';
import { format } from 'date-fns';
import * as chalk from 'chalk';
import { ConfigService } from '@nestjs/config';
import { Injectable, LoggerService as LoggerServiceInterface } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { LoggerType } from '../enum/logger.type.enum';
import { LoggerMetadata } from '../enum/logger.metadata.enum';

@Injectable()
export class LoggerService implements LoggerServiceInterface {
	private static readonly fileBytesMaxSize = 20971520; // 20MB
	private static readonly fileLimitForLogType = 5; // 100 MB for Log Type
	private static readonly space = '\x20';
	private readonly logger = null;

	constructor(private readonly configService: ConfigService) {
		this.logger = this.getLoggers();
	}

	public log(message: string, context: string) {
		const record = context + LoggerService.space + message;
		this.display(LoggerType.Log, message, context);
		this.logger.info.info(record);
	}

	public warn(message: string, context: string) {
		const record = context + LoggerService.space + message;
		this.display(LoggerType.Warn, message, context);
		this.logger.warn.warn(record);
	}

	public error(message: string, context: string) {
		const record = context + LoggerService.space + message;
		this.display(LoggerType.Error, message, context);
		this.logger.error.error(record);
	}

	private display(type: LoggerType, message: string, context: string) {
		const colorize = this.getColorize(type);
		const metadata = LoggerMetadata[type];

		// Coloring
		const ctx = this.getBrackets(chalk.yellow(context));
		const name = colorize(metadata.toString());
		const date = chalk.gray(this.getDate());
		const msg = colorize(message);

		const text = this.getMessage(date, name, ctx, msg);
		metadata.procedure(text);
	}

	private getDate(): string {
		const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
		return this.getBrackets(chalk.gray(date));
	}

	private getBrackets(str: string): string {
		const leftBracket = chalk.white('[');
		const rightBracket = chalk.white(']');
		return leftBracket + str + rightBracket;
	}

	private getColorize(type: LoggerType): (str: string) => any {
		const metadata = LoggerMetadata[type];
		const colorize = chalk[metadata.color];
		return (str: string) => colorize(str);
	}

	private getMessage(...args: string[]): string {
		return args.join(LoggerService.space);
	}

	private getLoggers() {
		return {
			error: this.createLogger('error'),
			info: this.createLogger('info'),
			warn: this.createLogger('warn'),
		};
	}

	private ensureLogsFolderExists() {
		const logsDir = 'logs';
		if (!existsSync(logsDir)) {
			mkdirSync(logsDir);
		}
	}

	private createLogger(level: string) {
		this.ensureLogsFolderExists();
		const maxFiles = LoggerService.fileLimitForLogType;
		const maxsize = LoggerService.fileBytesMaxSize;
		const format = 'DD/MM/YYYY HH:mm:ss';

		const formats = winston.format.combine(...[winston.format.timestamp({ format }), winston.format.prettyPrint()]);

		return winston.createLogger({
			format: formats,
			exitOnError: false,
			transports: [
				new winston.transports.File({
					filename: `logs/${level}.log`,
					level: level,
					maxFiles,
					maxsize,
				}),
				new winston.transports.Console(),
			],
		});
	}
}
