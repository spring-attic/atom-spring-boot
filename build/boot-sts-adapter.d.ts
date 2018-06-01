import { StsAdapter, HighlightParams } from '@pivotal-tools/atom-languageclient-commons';
export declare class BootStsAdapter extends StsAdapter {
    constructor();
    onHighlight(params: HighlightParams): void;
    private markHintsForEditor;
    private createHintMarker;
}
