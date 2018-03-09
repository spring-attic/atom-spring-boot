"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const atom_languageclient_commons_1 = require("@pivotal-tools/atom-languageclient-commons");
const boot_sts_adapter_1 = require("./boot-sts-adapter");
class SpringBootLanguageClient extends atom_languageclient_commons_1.JavaProcessLanguageClient {
    constructor() {
        //noinspection JSAnnotator
        super(path.join(__dirname, '..', 'server'), 'spring-boot-language-server.jar');
        // this.DEBUG = true;
    }
    postInitialization(server) {
        super.postInitialization(server);
        this.sendConfig(server);
        this._disposable.add(atom.config.observe('boot-java', () => this.sendConfig(server)));
    }
    sendConfig(server) {
        server.connection.didChangeConfiguration({ settings: { 'boot-java': atom.config.get('boot-java') } });
    }
    getGrammarScopes() {
        return ['source.java', 'source.boot-properties', 'source.boot-properties-yaml'];
    }
    getLanguageName() {
        return 'spring-boot';
    }
    getServerName() {
        return 'Spring Boot';
    }
    activate() {
        require('atom-package-deps')
            .install('spring-boot')
            .then(() => console.debug('All dependencies installed, good to go'));
        super.activate();
    }
    preferJdk() {
        return true;
    }
    launchVmArgs(jvm) {
        let vmargs = [
            // '-Xdebug',
            // '-agentlib:jdwp=transport=dt_socket,server=y,address=7999,suspend=n',
            '-Dorg.slf4j.simpleLogger.logFile=boot-java.log',
            '-Dorg.slf4j.simpleLogger.defaultLogLevel=debug',
        ];
        if (!jvm.isJdk()) {
            this.showErrorMessage('"Boot-Java" Package Functionality Limited', 'JAVA_HOME or PATH environment variable seems to point to a JRE. A JDK is required, hence Boot Hints are unavailable.');
        }
        return Promise.resolve(vmargs);
    }
    createStsAdapter() {
        return new boot_sts_adapter_1.BootStsAdapter();
    }
    filterChangeWatchedFiles(filePath) {
        return filePath.endsWith('.gradle') || filePath.endsWith(path.join('', 'pom.xml'));
    }
}
exports.SpringBootLanguageClient = SpringBootLanguageClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW5nLWJvb3QtbGFuZ3VhZ2UtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3NwcmluZy1ib290LWxhbmd1YWdlLWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw0RkFBcUY7QUFDckYseURBQWtEO0FBSWxELDhCQUFzQyxTQUFRLHVEQUF5QjtJQUVuRTtRQUNJLDBCQUEwQjtRQUMxQixLQUFLLENBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNwQyxpQ0FBaUMsQ0FDcEMsQ0FBQztRQUNGLHFCQUFxQjtJQUN6QixDQUFDO0lBRVMsa0JBQWtCLENBQUMsTUFBb0I7UUFDN0MsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFTyxVQUFVLENBQUMsTUFBb0I7UUFDbkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLHdCQUF3QixFQUFFLDZCQUE2QixDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELGVBQWU7UUFDWCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxhQUFhO1FBQ1QsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQzthQUN2QixPQUFPLENBQUMsYUFBYSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztRQUN6RSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFNBQVM7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBUTtRQUNqQixJQUFJLE1BQU0sR0FBRztZQUNULGFBQWE7WUFDYix3RUFBd0U7WUFDeEUsZ0RBQWdEO1lBQ2hELGdEQUFnRDtTQUNuRCxDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUNqQiwyQ0FBMkMsRUFDM0Msc0hBQXNILENBQ3pILENBQUM7UUFDTixDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE1BQU0sQ0FBQyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsd0JBQXdCLENBQUMsUUFBZ0I7UUFDckMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7Q0FFSjtBQXBFRCw0REFvRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHtKYXZhUHJvY2Vzc0xhbmd1YWdlQ2xpZW50fSBmcm9tICdAcGl2b3RhbC10b29scy9hdG9tLWxhbmd1YWdlY2xpZW50LWNvbW1vbnMnO1xuaW1wb3J0IHtCb290U3RzQWRhcHRlcn0gZnJvbSAnLi9ib290LXN0cy1hZGFwdGVyJztcbmltcG9ydCB7QWN0aXZlU2VydmVyfSBmcm9tICdhdG9tLWxhbmd1YWdlY2xpZW50JztcbmltcG9ydCB7SlZNfSBmcm9tICdAcGl2b3RhbC10b29scy9qdm0tbGF1bmNoLXV0aWxzJztcblxuZXhwb3J0IGNsYXNzIFNwcmluZ0Jvb3RMYW5ndWFnZUNsaWVudCBleHRlbmRzIEphdmFQcm9jZXNzTGFuZ3VhZ2VDbGllbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vbm9pbnNwZWN0aW9uIEpTQW5ub3RhdG9yXG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3NlcnZlcicpLFxuICAgICAgICAgICAgJ3NwcmluZy1ib290LWxhbmd1YWdlLXNlcnZlci5qYXInXG4gICAgICAgICk7XG4gICAgICAgIC8vIHRoaXMuREVCVUcgPSB0cnVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwb3N0SW5pdGlhbGl6YXRpb24oc2VydmVyOiBBY3RpdmVTZXJ2ZXIpIHtcbiAgICAgICAgc3VwZXIucG9zdEluaXRpYWxpemF0aW9uKHNlcnZlcik7XG4gICAgICAgIHRoaXMuc2VuZENvbmZpZyhzZXJ2ZXIpO1xuICAgICAgICAoPGFueT50aGlzKS5fZGlzcG9zYWJsZS5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnYm9vdC1qYXZhJywgKCkgPT4gdGhpcy5zZW5kQ29uZmlnKHNlcnZlcikpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbmRDb25maWcoc2VydmVyOiBBY3RpdmVTZXJ2ZXIpIHtcbiAgICAgICAgc2VydmVyLmNvbm5lY3Rpb24uZGlkQ2hhbmdlQ29uZmlndXJhdGlvbih7IHNldHRpbmdzOiB7J2Jvb3QtamF2YSc6IGF0b20uY29uZmlnLmdldCgnYm9vdC1qYXZhJykgfX0pO1xuICAgIH1cblxuICAgIGdldEdyYW1tYXJTY29wZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ3NvdXJjZS5qYXZhJywgJ3NvdXJjZS5ib290LXByb3BlcnRpZXMnLCAnc291cmNlLmJvb3QtcHJvcGVydGllcy15YW1sJ107XG4gICAgfVxuXG4gICAgZ2V0TGFuZ3VhZ2VOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ3NwcmluZy1ib290JztcbiAgICB9XG5cbiAgICBnZXRTZXJ2ZXJOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ1NwcmluZyBCb290JztcbiAgICB9XG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgcmVxdWlyZSgnYXRvbS1wYWNrYWdlLWRlcHMnKVxuICAgICAgICAgICAgLmluc3RhbGwoJ3NwcmluZy1ib290JylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnNvbGUuZGVidWcoJ0FsbCBkZXBlbmRlbmNpZXMgaW5zdGFsbGVkLCBnb29kIHRvIGdvJykpO1xuICAgICAgICBzdXBlci5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIHByZWZlckpkaygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGF1bmNoVm1BcmdzKGp2bTogSlZNKSB7XG4gICAgICAgIGxldCB2bWFyZ3MgPSBbXG4gICAgICAgICAgICAvLyAnLVhkZWJ1ZycsXG4gICAgICAgICAgICAvLyAnLWFnZW50bGliOmpkd3A9dHJhbnNwb3J0PWR0X3NvY2tldCxzZXJ2ZXI9eSxhZGRyZXNzPTc5OTksc3VzcGVuZD1uJyxcbiAgICAgICAgICAgICctRG9yZy5zbGY0ai5zaW1wbGVMb2dnZXIubG9nRmlsZT1ib290LWphdmEubG9nJyxcbiAgICAgICAgICAgICctRG9yZy5zbGY0ai5zaW1wbGVMb2dnZXIuZGVmYXVsdExvZ0xldmVsPWRlYnVnJyxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKCFqdm0uaXNKZGsoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JNZXNzYWdlKFxuICAgICAgICAgICAgICAgICdcIkJvb3QtSmF2YVwiIFBhY2thZ2UgRnVuY3Rpb25hbGl0eSBMaW1pdGVkJyxcbiAgICAgICAgICAgICAgICAnSkFWQV9IT01FIG9yIFBBVEggZW52aXJvbm1lbnQgdmFyaWFibGUgc2VlbXMgdG8gcG9pbnQgdG8gYSBKUkUuIEEgSkRLIGlzIHJlcXVpcmVkLCBoZW5jZSBCb290IEhpbnRzIGFyZSB1bmF2YWlsYWJsZS4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodm1hcmdzKTtcbiAgICB9XG5cbiAgICBjcmVhdGVTdHNBZGFwdGVyKCkge1xuICAgICAgICByZXR1cm4gbmV3IEJvb3RTdHNBZGFwdGVyKCk7XG4gICAgfVxuXG4gICAgZmlsdGVyQ2hhbmdlV2F0Y2hlZEZpbGVzKGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoLmVuZHNXaXRoKCcuZ3JhZGxlJykgfHwgZmlsZVBhdGguZW5kc1dpdGgocGF0aC5qb2luKCcnLCAncG9tLnhtbCcpKTtcbiAgICB9XG5cbn1cbiJdfQ==