import { FeatureRowData, Tariff, TariffFeature } from '@/types/PlansTable';

export function mapTariffsToFeatureRows(tariffs: Tariff[], features: TariffFeature[]): FeatureRowData[] {
    const featureRows = features.map((feature, originalIdx) => {
        const values = tariffs.map((tariff) => tariff.features.some((f) => f.lookup_key === feature.lookup_key));
        const count = values.filter(Boolean).length;
        return {
            id: feature.lookup_key,
            label: feature.name,
            values,
            count,
            originalIdx,
        };
    });
    featureRows.sort((a, b) => b.count - a.count || a.originalIdx - b.originalIdx);
    return featureRows.map(({ ...rest }) => rest);
}
