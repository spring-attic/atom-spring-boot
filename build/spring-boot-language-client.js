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
}
exports.SpringBootLanguageClient = SpringBootLanguageClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW5nLWJvb3QtbGFuZ3VhZ2UtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3NwcmluZy1ib290LWxhbmd1YWdlLWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw0RkFBcUY7QUFDckYseURBQWtEO0FBSWxELDhCQUFzQyxTQUFRLHVEQUF5QjtJQUVuRTtRQUNJLDBCQUEwQjtRQUMxQixLQUFLLENBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNwQyxpQ0FBaUMsQ0FDcEMsQ0FBQztRQUNGLHFCQUFxQjtJQUN6QixDQUFDO0lBRVMsa0JBQWtCLENBQUMsTUFBb0I7UUFDN0MsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFTyxVQUFVLENBQUMsTUFBb0I7UUFDbkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxlQUFlO1FBQ1gsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQzthQUN2QixPQUFPLENBQUMsYUFBYSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztRQUN6RSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQVE7UUFDakIsSUFBSSxNQUFNLEdBQUc7WUFDVCxhQUFhO1lBQ2Isd0VBQXdFO1lBQ3hFLGdEQUFnRDtTQUNuRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FDakIsMkNBQTJDLEVBQzNDLHNIQUFzSCxDQUN6SCxDQUFDO1NBQ0w7UUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxpQ0FBYyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHdCQUF3QixDQUFDLFFBQWdCO1FBQ3JDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztDQUVKO0FBbkVELDREQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge0phdmFQcm9jZXNzTGFuZ3VhZ2VDbGllbnR9IGZyb20gJ0BwaXZvdGFsLXRvb2xzL2F0b20tbGFuZ3VhZ2VjbGllbnQtY29tbW9ucyc7XG5pbXBvcnQge0Jvb3RTdHNBZGFwdGVyfSBmcm9tICcuL2Jvb3Qtc3RzLWFkYXB0ZXInO1xuaW1wb3J0IHtBY3RpdmVTZXJ2ZXJ9IGZyb20gJ2F0b20tbGFuZ3VhZ2VjbGllbnQnO1xuaW1wb3J0IHtKVk19IGZyb20gJ0BwaXZvdGFsLXRvb2xzL2p2bS1sYXVuY2gtdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgU3ByaW5nQm9vdExhbmd1YWdlQ2xpZW50IGV4dGVuZHMgSmF2YVByb2Nlc3NMYW5ndWFnZUNsaWVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9ub2luc3BlY3Rpb24gSlNBbm5vdGF0b3JcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnc2VydmVyJyksXG4gICAgICAgICAgICAnc3ByaW5nLWJvb3QtbGFuZ3VhZ2Utc2VydmVyLmphcidcbiAgICAgICAgKTtcbiAgICAgICAgLy8gdGhpcy5ERUJVRyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBvc3RJbml0aWFsaXphdGlvbihzZXJ2ZXI6IEFjdGl2ZVNlcnZlcikge1xuICAgICAgICBzdXBlci5wb3N0SW5pdGlhbGl6YXRpb24oc2VydmVyKTtcbiAgICAgICAgdGhpcy5zZW5kQ29uZmlnKHNlcnZlcik7XG4gICAgICAgICg8YW55PnRoaXMpLl9kaXNwb3NhYmxlLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdib290LWphdmEnLCAoKSA9PiB0aGlzLnNlbmRDb25maWcoc2VydmVyKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VuZENvbmZpZyhzZXJ2ZXI6IEFjdGl2ZVNlcnZlcikge1xuICAgICAgICBzZXJ2ZXIuY29ubmVjdGlvbi5kaWRDaGFuZ2VDb25maWd1cmF0aW9uKHsgc2V0dGluZ3M6IHsnYm9vdC1qYXZhJzogYXRvbS5jb25maWcuZ2V0KCdib290LWphdmEnKSB9fSk7XG4gICAgfVxuXG4gICAgZ2V0R3JhbW1hclNjb3BlcygpIHtcbiAgICAgICAgcmV0dXJuIFsnc291cmNlLmphdmEnLCAnc291cmNlLmJvb3QtcHJvcGVydGllcycsICdzb3VyY2UuYm9vdC1wcm9wZXJ0aWVzLXlhbWwnXTtcbiAgICB9XG5cbiAgICBnZXRMYW5ndWFnZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiAnc3ByaW5nLWJvb3QnO1xuICAgIH1cblxuICAgIGdldFNlcnZlck5hbWUoKSB7XG4gICAgICAgIHJldHVybiAnU3ByaW5nIEJvb3QnO1xuICAgIH1cblxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICByZXF1aXJlKCdhdG9tLXBhY2thZ2UtZGVwcycpXG4gICAgICAgICAgICAuaW5zdGFsbCgnc3ByaW5nLWJvb3QnKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5kZWJ1ZygnQWxsIGRlcGVuZGVuY2llcyBpbnN0YWxsZWQsIGdvb2QgdG8gZ28nKSk7XG4gICAgICAgIHN1cGVyLmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgcHJlZmVySmRrKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsYXVuY2hWbUFyZ3MoanZtOiBKVk0pIHtcbiAgICAgICAgbGV0IHZtYXJncyA9IFtcbiAgICAgICAgICAgIC8vICctWGRlYnVnJyxcbiAgICAgICAgICAgIC8vICctYWdlbnRsaWI6amR3cD10cmFuc3BvcnQ9ZHRfc29ja2V0LHNlcnZlcj15LGFkZHJlc3M9Nzk5OSxzdXNwZW5kPXknLFxuICAgICAgICAgICAgJy1Eb3JnLnNsZjRqLnNpbXBsZUxvZ2dlci5sb2dGaWxlPWJvb3QtamF2YS5sb2cnXG4gICAgICAgIF07XG4gICAgICAgIGlmICghanZtLmlzSmRrKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yTWVzc2FnZShcbiAgICAgICAgICAgICAgICAnXCJCb290LUphdmFcIiBQYWNrYWdlIEZ1bmN0aW9uYWxpdHkgTGltaXRlZCcsXG4gICAgICAgICAgICAgICAgJ0pBVkFfSE9NRSBvciBQQVRIIGVudmlyb25tZW50IHZhcmlhYmxlIHNlZW1zIHRvIHBvaW50IHRvIGEgSlJFLiBBIEpESyBpcyByZXF1aXJlZCwgaGVuY2UgQm9vdCBIaW50cyBhcmUgdW5hdmFpbGFibGUuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZtYXJncyk7XG4gICAgfVxuXG4gICAgY3JlYXRlU3RzQWRhcHRlcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCb290U3RzQWRhcHRlcigpO1xuICAgIH1cblxuICAgIGZpbHRlckNoYW5nZVdhdGNoZWRGaWxlcyhmaWxlUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aC5lbmRzV2l0aCgnLmdyYWRsZScpIHx8IGZpbGVQYXRoLmVuZHNXaXRoKHBhdGguam9pbignJywgJ3BvbS54bWwnKSk7XG4gICAgfVxuXG59XG4iXX0=