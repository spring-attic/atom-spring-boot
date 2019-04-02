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
        this._disposable.add(atom.config.observe('spring-boot', () => this.sendConfig(server)));
    }
    sendConfig(server) {
        server.connection.didChangeConfiguration({ settings: { 'boot-java': atom.config.get('spring-boot') } });
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
            // '-agentlib:jdwp=transport=dt_socket,server=y,address=7999,suspend=y',
            '-Dorg.slf4j.simpleLogger.logFile=boot-java.log'
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
    getJavaOptions() {
        const home = atom.config.get('spring-boot.java.home');
        const vmargs = atom.config.get('spring-boot.java.vmargs');
        return {
            home: typeof home === 'string' ? home : undefined,
            vmargs: Array.isArray(vmargs) ? vmargs : undefined
        };
    }
}
exports.SpringBootLanguageClient = SpringBootLanguageClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW5nLWJvb3QtbGFuZ3VhZ2UtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3NwcmluZy1ib290LWxhbmd1YWdlLWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw0RkFBa0c7QUFDbEcseURBQWtEO0FBSWxELDhCQUFzQyxTQUFRLHVEQUF5QjtJQUVuRTtRQUNJLDBCQUEwQjtRQUMxQixLQUFLLENBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNwQyxpQ0FBaUMsQ0FDcEMsQ0FBQztRQUNGLHFCQUFxQjtJQUN6QixDQUFDO0lBRVMsa0JBQWtCLENBQUMsTUFBb0I7UUFDN0MsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFTyxVQUFVLENBQUMsTUFBb0I7UUFDbkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxlQUFlO1FBQ1gsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQzthQUN2QixPQUFPLENBQUMsYUFBYSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztRQUN6RSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQVE7UUFDakIsSUFBSSxNQUFNLEdBQUc7WUFDVCxhQUFhO1lBQ2Isd0VBQXdFO1lBQ3hFLGdEQUFnRDtTQUNuRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FDakIsMkNBQTJDLEVBQzNDLHNIQUFzSCxDQUN6SCxDQUFDO1NBQ0w7UUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxpQ0FBYyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHdCQUF3QixDQUFDLFFBQWdCO1FBQ3JDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVELGNBQWM7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDMUQsT0FBTztZQUNILElBQUksRUFBRSxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNqRCxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRSxTQUFTO1NBQ3RELENBQUM7SUFDTixDQUFDO0NBRUo7QUE1RUQsNERBNEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7SmF2YVByb2Nlc3NMYW5ndWFnZUNsaWVudCwgSmF2YU9wdGlvbnN9IGZyb20gJ0BwaXZvdGFsLXRvb2xzL2F0b20tbGFuZ3VhZ2VjbGllbnQtY29tbW9ucyc7XG5pbXBvcnQge0Jvb3RTdHNBZGFwdGVyfSBmcm9tICcuL2Jvb3Qtc3RzLWFkYXB0ZXInO1xuaW1wb3J0IHtBY3RpdmVTZXJ2ZXJ9IGZyb20gJ2F0b20tbGFuZ3VhZ2VjbGllbnQnO1xuaW1wb3J0IHtKVk19IGZyb20gJ0BwaXZvdGFsLXRvb2xzL2p2bS1sYXVuY2gtdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgU3ByaW5nQm9vdExhbmd1YWdlQ2xpZW50IGV4dGVuZHMgSmF2YVByb2Nlc3NMYW5ndWFnZUNsaWVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9ub2luc3BlY3Rpb24gSlNBbm5vdGF0b3JcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnc2VydmVyJyksXG4gICAgICAgICAgICAnc3ByaW5nLWJvb3QtbGFuZ3VhZ2Utc2VydmVyLmphcidcbiAgICAgICAgKTtcbiAgICAgICAgLy8gdGhpcy5ERUJVRyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBvc3RJbml0aWFsaXphdGlvbihzZXJ2ZXI6IEFjdGl2ZVNlcnZlcikge1xuICAgICAgICBzdXBlci5wb3N0SW5pdGlhbGl6YXRpb24oc2VydmVyKTtcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnKHNlcnZlcik7XG4gICAgICAgICg8YW55PnRoaXMpLl9kaXNwb3NhYmxlLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdzcHJpbmctYm9vdCcsICgpID0+IHRoaXMuc2VuZENvbmZpZyhzZXJ2ZXIpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZW5kQ29uZmlnKHNlcnZlcjogQWN0aXZlU2VydmVyKSB7XG4gICAgICAgIHNlcnZlci5jb25uZWN0aW9uLmRpZENoYW5nZUNvbmZpZ3VyYXRpb24oeyBzZXR0aW5nczogeydib290LWphdmEnOiBhdG9tLmNvbmZpZy5nZXQoJ3NwcmluZy1ib290JykgfX0pO1xuICAgIH1cblxuICAgIGdldEdyYW1tYXJTY29wZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ3NvdXJjZS5qYXZhJywgJ3NvdXJjZS5ib290LXByb3BlcnRpZXMnLCAnc291cmNlLmJvb3QtcHJvcGVydGllcy15YW1sJ107XG4gICAgfVxuXG4gICAgZ2V0TGFuZ3VhZ2VOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ3NwcmluZy1ib290JztcbiAgICB9XG5cbiAgICBnZXRTZXJ2ZXJOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ1NwcmluZyBCb290JztcbiAgICB9XG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgcmVxdWlyZSgnYXRvbS1wYWNrYWdlLWRlcHMnKVxuICAgICAgICAgICAgLmluc3RhbGwoJ3NwcmluZy1ib290JylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnNvbGUuZGVidWcoJ0FsbCBkZXBlbmRlbmNpZXMgaW5zdGFsbGVkLCBnb29kIHRvIGdvJykpO1xuICAgICAgICBzdXBlci5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIHByZWZlckpkaygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGF1bmNoVm1BcmdzKGp2bTogSlZNKSB7XG4gICAgICAgIGxldCB2bWFyZ3MgPSBbXG4gICAgICAgICAgICAvLyAnLVhkZWJ1ZycsXG4gICAgICAgICAgICAvLyAnLWFnZW50bGliOmpkd3A9dHJhbnNwb3J0PWR0X3NvY2tldCxzZXJ2ZXI9eSxhZGRyZXNzPTc5OTksc3VzcGVuZD15JyxcbiAgICAgICAgICAgICctRG9yZy5zbGY0ai5zaW1wbGVMb2dnZXIubG9nRmlsZT1ib290LWphdmEubG9nJ1xuICAgICAgICBdO1xuICAgICAgICBpZiAoIWp2bS5pc0pkaygpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgJ1wiQm9vdC1KYXZhXCIgUGFja2FnZSBGdW5jdGlvbmFsaXR5IExpbWl0ZWQnLFxuICAgICAgICAgICAgICAgICdKQVZBX0hPTUUgb3IgUEFUSCBlbnZpcm9ubWVudCB2YXJpYWJsZSBzZWVtcyB0byBwb2ludCB0byBhIEpSRS4gQSBKREsgaXMgcmVxdWlyZWQsIGhlbmNlIEJvb3QgSGludHMgYXJlIHVuYXZhaWxhYmxlLidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2bWFyZ3MpO1xuICAgIH1cblxuICAgIGNyZWF0ZVN0c0FkYXB0ZXIoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQm9vdFN0c0FkYXB0ZXIoKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJDaGFuZ2VXYXRjaGVkRmlsZXMoZmlsZVBhdGg6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZmlsZVBhdGguZW5kc1dpdGgoJy5ncmFkbGUnKSB8fCBmaWxlUGF0aC5lbmRzV2l0aChwYXRoLmpvaW4oJycsICdwb20ueG1sJykpO1xuICAgIH1cblxuICAgIGdldEphdmFPcHRpb25zKCk6IEphdmFPcHRpb25zIHtcbiAgICAgICAgY29uc3QgaG9tZSA9IGF0b20uY29uZmlnLmdldCgnc3ByaW5nLWJvb3QuamF2YS5ob21lJyk7XG4gICAgICAgIGNvbnN0IHZtYXJncyA9IGF0b20uY29uZmlnLmdldCgnc3ByaW5nLWJvb3QuamF2YS52bWFyZ3MnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhvbWU6IHR5cGVvZiBob21lID09PSAnc3RyaW5nJyA/IGhvbWUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2bWFyZ3M6IEFycmF5LmlzQXJyYXkodm1hcmdzKSA/IHZtYXJncyA6ICB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiJdfQ==