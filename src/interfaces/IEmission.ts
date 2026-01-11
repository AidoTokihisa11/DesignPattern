export type EmissionType = 'Musique' | 'Sport' | 'Actu';

export interface IEmissionDetails {
    [key: string]: unknown;
}

export interface IEmission {
    id: string;
    type: EmissionType;
    content: string;
    timestamp: Date;
    details: IEmissionDetails;
}
