import { JavaProcessLanguageClient } from '@pivotal-tools/atom-languageclient-commons';
import { BootStsAdapter } from './boot-sts-adapter';
import { ActiveServer } from 'atom-languageclient';
import { JVM } from '@pivotal-tools/jvm-launch-utils';
export declare class SpringBootLanguageClient extends JavaProcessLanguageClient {
    constructor();
    protected postInitialization(server: ActiveServer): void;
    private sendConfig(server);
    getGrammarScopes(): string[];
    getLanguageName(): string;
    getServerName(): string;
    activate(): void;
    preferJdk(): boolean;
    launchVmArgs(jvm: JVM): Promise<string[]>;
    createStsAdapter(): BootStsAdapter;
    filterChangeWatchedFiles(filePath: string): boolean;
}
