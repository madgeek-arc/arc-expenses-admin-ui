/**
 * Created by stefania on 9/10/16.
 */
export class Facet {

    field: string;
    label: string;

    values: FacetValue[];
}

export interface FacetValue {

    value: string;
    label: string;
    count: number;
    isChecked: boolean;
}

export class SearchResults<T> {

    from: number;
    to: number;
    total: number;

    results: T[];
    facets: Facet[];
}
