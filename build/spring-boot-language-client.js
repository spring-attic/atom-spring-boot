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
        return ['source.java', 'source.boot-properties', 'source.boot-properties-yaml', 'text.xml'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW5nLWJvb3QtbGFuZ3VhZ2UtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3NwcmluZy1ib290LWxhbmd1YWdlLWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw0RkFBa0c7QUFDbEcseURBQWtEO0FBSWxELDhCQUFzQyxTQUFRLHVEQUF5QjtJQUVuRTtRQUNJLDBCQUEwQjtRQUMxQixLQUFLLENBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNwQyxpQ0FBaUMsQ0FDcEMsQ0FBQztRQUNGLHFCQUFxQjtJQUN6QixDQUFDO0lBRVMsa0JBQWtCLENBQUMsTUFBb0I7UUFDN0MsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFTyxVQUFVLENBQUMsTUFBb0I7UUFDbkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsRUFBRSw2QkFBNkIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQsZUFBZTtRQUNYLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsbUJBQW1CLENBQUM7YUFDdkIsT0FBTyxDQUFDLGFBQWEsQ0FBQzthQUN0QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUM7UUFDekUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFRO1FBQ2pCLElBQUksTUFBTSxHQUFHO1lBQ1QsYUFBYTtZQUNiLHdFQUF3RTtZQUN4RSxnREFBZ0Q7U0FDbkQsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQ2pCLDJDQUEyQyxFQUMzQyxzSEFBc0gsQ0FDekgsQ0FBQztTQUNMO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksaUNBQWMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxRQUFnQjtRQUNyQyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxjQUFjO1FBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN0RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzFELE9BQU87WUFDSCxJQUFJLEVBQUUsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDakQsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsU0FBUztTQUN0RCxDQUFDO0lBQ04sQ0FBQztDQUVKO0FBNUVELDREQTRFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge0phdmFQcm9jZXNzTGFuZ3VhZ2VDbGllbnQsIEphdmFPcHRpb25zfSBmcm9tICdAcGl2b3RhbC10b29scy9hdG9tLWxhbmd1YWdlY2xpZW50LWNvbW1vbnMnO1xuaW1wb3J0IHtCb290U3RzQWRhcHRlcn0gZnJvbSAnLi9ib290LXN0cy1hZGFwdGVyJztcbmltcG9ydCB7QWN0aXZlU2VydmVyfSBmcm9tICdhdG9tLWxhbmd1YWdlY2xpZW50JztcbmltcG9ydCB7SlZNfSBmcm9tICdAcGl2b3RhbC10b29scy9qdm0tbGF1bmNoLXV0aWxzJztcblxuZXhwb3J0IGNsYXNzIFNwcmluZ0Jvb3RMYW5ndWFnZUNsaWVudCBleHRlbmRzIEphdmFQcm9jZXNzTGFuZ3VhZ2VDbGllbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vbm9pbnNwZWN0aW9uIEpTQW5ub3RhdG9yXG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3NlcnZlcicpLFxuICAgICAgICAgICAgJ3NwcmluZy1ib290LWxhbmd1YWdlLXNlcnZlci5qYXInXG4gICAgICAgICk7XG4gICAgICAgIC8vIHRoaXMuREVCVUcgPSB0cnVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwb3N0SW5pdGlhbGl6YXRpb24oc2VydmVyOiBBY3RpdmVTZXJ2ZXIpIHtcbiAgICAgICAgc3VwZXIucG9zdEluaXRpYWxpemF0aW9uKHNlcnZlcik7XG4gICAgICAgIHRoaXMuc2VuZENvbmZpZyhzZXJ2ZXIpO1xuICAgICAgICAoPGFueT50aGlzKS5fZGlzcG9zYWJsZS5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnc3ByaW5nLWJvb3QnLCAoKSA9PiB0aGlzLnNlbmRDb25maWcoc2VydmVyKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VuZENvbmZpZyhzZXJ2ZXI6IEFjdGl2ZVNlcnZlcikge1xuICAgICAgICBzZXJ2ZXIuY29ubmVjdGlvbi5kaWRDaGFuZ2VDb25maWd1cmF0aW9uKHsgc2V0dGluZ3M6IHsnYm9vdC1qYXZhJzogYXRvbS5jb25maWcuZ2V0KCdzcHJpbmctYm9vdCcpIH19KTtcbiAgICB9XG5cbiAgICBnZXRHcmFtbWFyU2NvcGVzKCkge1xuICAgICAgICByZXR1cm4gWydzb3VyY2UuamF2YScsICdzb3VyY2UuYm9vdC1wcm9wZXJ0aWVzJywgJ3NvdXJjZS5ib290LXByb3BlcnRpZXMteWFtbCcsICd0ZXh0LnhtbCddO1xuICAgIH1cblxuICAgIGdldExhbmd1YWdlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdzcHJpbmctYm9vdCc7XG4gICAgfVxuXG4gICAgZ2V0U2VydmVyTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdTcHJpbmcgQm9vdCc7XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIHJlcXVpcmUoJ2F0b20tcGFja2FnZS1kZXBzJylcbiAgICAgICAgICAgIC5pbnN0YWxsKCdzcHJpbmctYm9vdCcpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmRlYnVnKCdBbGwgZGVwZW5kZW5jaWVzIGluc3RhbGxlZCwgZ29vZCB0byBnbycpKTtcbiAgICAgICAgc3VwZXIuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBwcmVmZXJKZGsoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGxhdW5jaFZtQXJncyhqdm06IEpWTSkge1xuICAgICAgICBsZXQgdm1hcmdzID0gW1xuICAgICAgICAgICAgLy8gJy1YZGVidWcnLFxuICAgICAgICAgICAgLy8gJy1hZ2VudGxpYjpqZHdwPXRyYW5zcG9ydD1kdF9zb2NrZXQsc2VydmVyPXksYWRkcmVzcz03OTk5LHN1c3BlbmQ9eScsXG4gICAgICAgICAgICAnLURvcmcuc2xmNGouc2ltcGxlTG9nZ2VyLmxvZ0ZpbGU9Ym9vdC1qYXZhLmxvZydcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKCFqdm0uaXNKZGsoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JNZXNzYWdlKFxuICAgICAgICAgICAgICAgICdcIkJvb3QtSmF2YVwiIFBhY2thZ2UgRnVuY3Rpb25hbGl0eSBMaW1pdGVkJyxcbiAgICAgICAgICAgICAgICAnSkFWQV9IT01FIG9yIFBBVEggZW52aXJvbm1lbnQgdmFyaWFibGUgc2VlbXMgdG8gcG9pbnQgdG8gYSBKUkUuIEEgSkRLIGlzIHJlcXVpcmVkLCBoZW5jZSBCb290IEhpbnRzIGFyZSB1bmF2YWlsYWJsZS4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodm1hcmdzKTtcbiAgICB9XG5cbiAgICBjcmVhdGVTdHNBZGFwdGVyKCkge1xuICAgICAgICByZXR1cm4gbmV3IEJvb3RTdHNBZGFwdGVyKCk7XG4gICAgfVxuXG4gICAgZmlsdGVyQ2hhbmdlV2F0Y2hlZEZpbGVzKGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoLmVuZHNXaXRoKCcuZ3JhZGxlJykgfHwgZmlsZVBhdGguZW5kc1dpdGgocGF0aC5qb2luKCcnLCAncG9tLnhtbCcpKTtcbiAgICB9XG5cbiAgICBnZXRKYXZhT3B0aW9ucygpOiBKYXZhT3B0aW9ucyB7XG4gICAgICAgIGNvbnN0IGhvbWUgPSBhdG9tLmNvbmZpZy5nZXQoJ3NwcmluZy1ib290LmphdmEuaG9tZScpO1xuICAgICAgICBjb25zdCB2bWFyZ3MgPSBhdG9tLmNvbmZpZy5nZXQoJ3NwcmluZy1ib290LmphdmEudm1hcmdzJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBob21lOiB0eXBlb2YgaG9tZSA9PT0gJ3N0cmluZycgPyBob21lIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdm1hcmdzOiBBcnJheS5pc0FycmF5KHZtYXJncykgPyB2bWFyZ3MgOiAgdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iXX0=