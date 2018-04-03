import { ResourceService } from '../services/resource-service';
export declare class CsvExportComponent {
    resource: ResourceService;
    constructor(resource: ResourceService);
    exportCsv(): void;
}
