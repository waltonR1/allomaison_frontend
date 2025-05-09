import {providerLabel} from "@/data/providerLabel.ts";

export const categoryProviderLabelsMap: Record<string, providerLabel[]> = {
    Cleaning: [
        providerLabel.LicensedCleaner,
        providerLabel.GreenCleaningCertified,
        providerLabel.HEPAFilterUsed,
        providerLabel.AntiAllergenProducts,
        providerLabel.PostRenovationCleaning,
        providerLabel.EcoFriendly,
        providerLabel.EquipmentIncluded,
        providerLabel.Available24_7,
        providerLabel.SameDayService,
        providerLabel.SatisfactionGuaranteed,
        providerLabel.CovidVaccinated,
        providerLabel.BackgroundChecked,
        providerLabel.FemaleProfessional
    ],
    Childcare: [
        providerLabel.CertifiedNanny,
        providerLabel.FirstAidCertified,
        providerLabel.CPRCertified,
        providerLabel.EarlyEducationQualified,
        providerLabel.MontessoriTrained,
        providerLabel.SpecialNeedsExperience,
        providerLabel.OvernightCare,
        providerLabel.BackgroundChecked,
        providerLabel.InsuredBonded,
        providerLabel.FemaleProfessional,
        providerLabel.Multilingual,
        providerLabel.CovidVaccinated
    ],
    'Elder Care': [
        providerLabel.CertifiedCaregiver,
        providerLabel.NurseRegistered,
        providerLabel.DementiaCareTrained,
        providerLabel.PalliativeCareTrained,
        providerLabel.StrokeRecoverySupport,
        providerLabel.MobilityAssistance,
        providerLabel.LiveInCareAvailable,
        providerLabel.FirstAidCertified,
        providerLabel.Available24_7,
        providerLabel.InsuredBonded,
        providerLabel.SatisfactionGuaranteed,
        providerLabel.CovidVaccinated,
        providerLabel.Multilingual
    ],
    'Appliance Cleaning': [
        providerLabel.ApplianceCleaningExpert,
        providerLabel.UsesNonToxicChemicals,
        providerLabel.SteamCleaning,
        providerLabel.OdorElimination,
        providerLabel.FactoryTrainedTechnician,
        providerLabel.EcoFriendly,
        providerLabel.EquipmentIncluded,
        providerLabel.SatisfactionGuaranteed,
        providerLabel.SameDayService,
        providerLabel.BackgroundChecked
    ],
    'Home Repairs': [
        providerLabel.LicensedElectrician,
        providerLabel.LicensedPlumber,
        providerLabel.CertifiedHandyman,
        providerLabel.SafetyStandardCompliant,
        providerLabel.FreeInspection,
        providerLabel.QuickEstimateProvided,
        providerLabel.RenovationExperience,
        providerLabel.EmergencyService,
        providerLabel.EquipmentIncluded,
        providerLabel.InsuredBonded,
        providerLabel.CovidVaccinated,
        providerLabel.SatisfactionGuaranteed
    ],
    'Private Chef': [
        providerLabel.CertifiedChef,
        providerLabel.NutritionistCertified,
        providerLabel.CulinarySchoolGraduate,
        providerLabel.VeganSpecialist,
        providerLabel.KosherCertified,
        providerLabel.GlutenFreeOptions,
        providerLabel.MealPrepService,
        providerLabel.CookingClasses,
        providerLabel.Multilingual,
        providerLabel.FreeConsultation,
        providerLabel.SatisfactionGuaranteed
    ]
}
