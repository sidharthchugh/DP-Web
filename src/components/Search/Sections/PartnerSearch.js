import {multiSelectValues, chunk} from '../../util/multiSelectValues';

export function PartnerSearch(values) {
return {
  partnerSearch: {
    meta: {
      name: 'partnerSearch',
      type: 'Partners - I want to specify the details of what I am looking for',
      createdAt: null
    },
    fields: {
      partnerSearchName: {
        name: 'partnerSearchName',
        englishLabel: 'Search Name',
        germanLabel: 'Search Name',
        component: 'text',
        englishTooltip: 'Indicate the name of your search. If you do not have a name, a short descriptive title can substitute',
        germanTooltip: 'Fügen Sie den Namen oder einen kurzen, beschreibenden Titel für Ihr Search hinzu',
        validations: '25',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'string',
        typeValues: null,
        ko:'no'
    },
    partnerBusinessObjective: {
        name: 'partnerBusinessObjective',
        englishLabel: 'Business objective',
        germanLabel: 'Geschäftsziel',
        component: 'dropdownMultiple',
        englishTooltip: 'Indicate the business objectives you aim to accomplish with your new partner',
        germanTooltip: 'Wählen Sie die Geschäftsziel bzw. das Endergebniss, das Sie durch die Partnerschaft erreichen wollen',
        validations: '300',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'dropdownMultiple',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.business_objectives.split('\n'))),
        ko:'yes'
    },
     partnerIndustry: {
        name: 'partnerIndustry',
        englishLabel: 'Partner industry',
        germanLabel: 'Industrie',
        component: 'dropdownMultiple',
        englishTooltip: 'Indicate the industry of your potential partner',
        germanTooltip: 'In welcher Industrie sollte sich das Unternehmen befinden?',
        type: 'dropdownMultiple',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.industry.split('\n'))),
        ko:'yes'
      },
     partnerSector: {
        name: 'partnerSector',
        englishLabel: 'Partner sector',
        germanLabel: 'Sektor',
        component: 'dropdownspecial',
        englishTooltip: 'Indicate the sector of your potential partner',
        germanTooltip: 'In welchem Sektor sollte das Unternehmen tätig sein?',
        validations: '300',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'dropdownMultiple',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.sector.split('\n'))),
        ko:'yes',
        conditionalValues: {
            Energy: ['Energy Equipment & Services', 'Oil, Gas & Consumable Fuels'],
            Materials: ['Chemicals', 'Construction Materials', 'Containers & Packaging', 'Metals & Mining', 'Paper and Forest Products'],
            Industrials: ['Aerospace & Defense', 'Building Products', 'Construction & Engineering', 'Electrical Equipment', 'Industrial Conglomerates', 'Machinery', 'Commercial Services & Supplies', 'Professional Services', 'Transportation'],
            'Automobiles & Components': ['Auto Components', 'Automobiles'],
            'Consumer Durables & Apparel': ['Household Durables', 'Leisure Products', 'Textiles, Apparel & Luxury Goods'],
            'Consumer Services': ['Hotels, Restaurants & Leisure', 'Diversified Consumer Services', 'Media', 'Retailing'],
            'Consumer Staples': ['Food & Staples Retailing', 'Beverages', 'Food Products', 'Tobacco', 'Household & Personal Products'],
            'Health Care': ['Health Care Equipment & Supplies', 'Health Care Technology', 'Biotechnology', 'Pharmaceuticals', 'Life Sciences'],
            Financials: ['Banks', 'Thrifts & Mortgage Finance', 'Diversified Financial Services', 'Consumer Finance', 'Capital Markets', 'Insurance'],
            'Information Technology': ['Internet Software & Services', 'IT Services', 'Software', 'Technology Hardware & Equipment', 'Electronic Equipment, Instruments & Components', 'Office Electronics', 'Semiconductor Equipment & Products', 'Internet of Things'],
            'Telecommunication Services': ['Diversified Telecommunication Services'],
            Utilities: ['Electric Utilities', 'Gas Utilities', 'Multi-Utilities', 'Water Utilities', 'Independent Power and Renewable Electricity Producers'],
            'Real Estate': ['Equity Real Estate Investment Trusts (REITs)', 'Real Estate Management & Development']
          }
      },
     partnerSubSector: {
        name: 'partnerSubSector',
        englishLabel: 'Partner sub-sector',
        germanLabel: 'Sub-Sektor',
        component: 'dropdownspecial',
        englishTooltip: 'Indicate the sub-sector of your potential partner',
        germanTooltip: 'In welchem Sub-Sektor sollte das Unternehmen tätig sein?',
        type: 'dropdownMultiple',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.sub_sector.split('\n'))),
        ko:'yes',
        conditionalValues: {
          'Energy Equipment & Services': ['Oil & Gas Drilling', 'Oil & Gas Equipment & Services'],
          'Oil, Gas & Consumable Fuels': ['Integrated Oil & Gas', 'Oil & Gas Exploration & Production', 'Oil & Gas Refining & Marketing', 'Oil & Gas Storage & Transportation', 'Coal & Consumable Fuels'],
          Chemicals: ['Commodity Chemicals', 'Diversified Chemicals', 'Fertilizers & Agricultural Chemicals', 'Industrial Gases', 'Specialty Chemicals'],
          'Construction Materials': [],
          'Containers & Packaging': ['Metal & Glass Containers', 'Paper Packaging'],
          'Metals & Mining': ['Aluminum', 'Diversified Metals & Mining', 'Gold', 'Precious Metals & Minerals', 'Silver', 'Steel'],
          'Paper and Forest Products': ['Forest Products', 'Paper Products'],
          'Aerospace & Defense': [],
          'Building Products': [],
          'Construction & Engineering': [],
          'Electrical Equipment': ['Electrical Components & Equipment', 'Heavy Electrical Equipment'],
          'Industrial Conglomerates': [],
          Machinery: ['Construction Machinery & Heavy Trucks', 'Agricultural & Farm Machinery', 'Industrial Machinery'],
          'Commercial Services & Supplies': ['Commercial Printing', 'Data Processing Services', 'Diversified Commercial & Professional Services', 'Environmental & Facilities Services', 'Office Services & Supplies', 'Diversified Support Services', 'Security & Alarm Services'],
          'Professional Services': ['Human Resource & Employment Services', 'Research & Consulting Services'],
          Transportation: ['Air Freight & Logistics', 'Airlines', 'Marine', 'Road & Rail', 'Transportation Infrastructure'],
          'Auto Components': ['Auto Parts & Equipment', 'Tires & Rubber'],
          Automobiles: ['Automobile Manufacturers', 'Motorcycle Manufacturers'],
          'Household Durables': ['Consumer Electronics', 'Home Furnishings', 'Homebuilding', 'Household Appliances', 'Housewares & Specialties'],
          'Leisure Products': [],
          'Textiles, Apparel & Luxury Goods': ['Apparel, Accessories & Luxury Goods', 'Footwear', 'Textiles'],
          'Hotels, Restaurants & Leisure': ['Casinos & Gaming', 'Hotels, Resorts & Cruise Lines', 'Leisure Facilities', 'Restaurants'],
          'Diversified Consumer Services': ['Education Services', 'Specialized Consumer Services'],
          Media: ['Advertising', 'Broadcasting', 'Cable & Satellite', 'Movies & Entertainment', 'Publishing'],
          Retailing: ['Catalog Retail', 'Internet Retail', 'Department Stores', 'General Merchandise Stores', 'Apparel Retail', 'Computer & Electronics Retail', 'Home Improvement Retail', 'Specialty Stores', 'Automotive Retail', 'Homefurnishing Retail'],
          'Food & Staples Retailing': ['Drug Retail', 'Food Distributors', 'Food Retail', 'Hypermarkets & Super Centers'],
          Beverages: ['Brewers', 'Distillers & Vintners', 'Soft Drinks'],
          'Food Products': ['Agricultural Products', 'Meat, Poultry & Fish', 'Packaged Foods & Meats'],
          Tobacco: [],
          'Household & Personal Products': ['Household Products', 'Personal Products'],
          'Health Care Equipment & Supplies': ['Health Care Equipment', 'Health Care Supplies', 'Health Care Distributors', 'Health Care Services', 'Health Care Facilities', 'Managed Health Care'],
          'Health Care Technology': [],
          Biotechnology: [],
          Pharmaceuticals: [],
          'Life Sciences': [],
          Banks: ['Diversified Banks', 'Regional Banks'],
          'Thrifts & Mortgage Finance': ['Thrifts & Mortgage Finance'],
          'Diversified Financial Services': ['Consumer Finance', 'Other Diversified Financial Services', 'Multi-Sector Holdings', 'Specialized Finance'],
          'Consumer Finance': [],
          'Capital Markets': ['Asset Management & Custody Banks', 'Investment Banking & Brokerage', 'Diversified Capital Markets'],
          Insurance: ['Insurance Brokers', 'Life & Health Insurance', 'Multi-line Insurance', 'Property & Casualty Insurance', 'Reinsurance'],
          'Internet Software & Services': [],
          'IT Services': ['IT Consulting & Other Services', 'Data Processing & Outsourced Services'],
          Software: ['Application Software', 'Systems Software', 'Home Entertainment Software'],
          'Technology Hardware & Equipment': ['Communications Equipment', 'Networking Equipment', 'Telecommunications Equipment', 'Computer Hardware', 'Computer Storage & Peripherals', 'Technology Hardware, Storage & Peripherals'],
          'Electronic Equipment, Instruments & Components': ['Electronic Equipment & Instruments', 'Electronic Components', 'Electronic Manufacturing Services', 'Technology Distributors'],
          'Office Electronics': ['Office Electronics'],
          'Semiconductor Equipment & Products': ['Semiconductor Equipment', 'Semiconductors'],
          'Internet of Things': ['Internet of Things'],
          'Diversified Telecommunication Services': ['Alternative Carriers', 'Integrated Telecommunication Services'],
          'Wireless Telecommunication Services': [],
          'Electric Utilities': [],
          'Gas Utilities': [],
          'Multi-Utilities': [],
          'Water Utilities': [],
          'Independent Power and Renewable Electricity Producers': ['Independent Power Producers & Energy Traders', 'Renewable Electricity'],
          'Equity Real Estate Investment Trusts (REITs)': ['Industrial REITs', 'Hotel & Resort REITs', 'Office REITs', 'Health Care REITs', 'Residential REITs', 'Retail REITs', 'Specialized REITs'],
          'Real Estate Management & Development': ['Diversified Real Estate Activities', 'Real Estate Operating Companies', 'Real Estate Development', 'Real Estate Services']
        }
      },
      partnerOrganizationType: {
         name: 'partnerOrganizationType',
         englishLabel: 'Partner Organization Type',
         germanLabel: 'Organisationsform',
         component: 'dropdownMultiple',
         englishTooltip: 'Define the organization type of your partner in order to understand the size/type of institution you want to work with',
         germanTooltip: 'Welche Organisationsform sollte der gesuchte Partner sein?',
         type: 'dropdownMultiple',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.organization_type.split('\n'))),
         ko:'yes'
       },
        partnerBusinessType: {
         name: 'partnerBusinessType',
         englishLabel: 'Partner Business type',
         germanLabel: 'Geschäftsart',
         component: 'dropdownMultiple',
         englishTooltip: 'Define the business type of your potential partner',
         germanTooltip: 'Welche Geschäftsart sollte das Unternehmen sein?',
         type: 'dropdownMultiple',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.business_type.split('\n'))),
         ko:'yes'
       },
     partnerKeyActivities: {
        name: 'partnerKeyActivities',
        englishLabel: 'Partner Key Activities',
        germanLabel: 'Kernaktivitäten',
        component: 'multiSelectAutoSuggest',
        englishTooltip: 'Which Key Activities does your potential partner perform?',
        germanTooltip: 'Welche Kernaktivitäten sollte das Unternehmen durchführen?',
        type: 'multiSelectAutoSuggest',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: [{}],
        ko:'no'
      },
      partnerKeyResources: {
         name: 'partnerKeyResources',
         englishLabel: 'Partner Key Resources',
         germanLabel: 'Wichtigste Ressourcen',
         component: 'multiSelectAutoSuggest',
         englishTooltip: 'Which Key Resources should your potential partner possess?',
         germanTooltip: 'Welche wichtigen Ressourcen sollte das Unternehmen besitzen?',
         type: 'multiSelectAutoSuggest',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: [{}],
         ko:'no'
      },
      partnerChannel: {
         name: 'partnerChannel',
         englishLabel: 'Partner Channels',
         germanLabel: 'Kanäle',
         component: 'multiSelectAutoSuggest',
         englishTooltip: 'Indicate which channels your partner company should use to reach ist customers',
         germanTooltip: 'Welche Kanäle sollte das Unternehmen aufgebaut haben bzw. nutzen, um seine Kunden zu erreichen?',
         type: 'multiSelectAutoSuggest',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: [{}],
         ko:'no'
      },
      partnerLocation: {
         name: 'partnerLocation',
         englishLabel: 'Partner location',
         germanLabel: 'Niederlassungen',
         component: 'multiSelect',
         englishTooltip: 'Do you have a preferred country/city where your partner should be located?',
         germanTooltip: 'An welchen Standorten sollte ihr potenzieller Partner ansässig sein?',
         type: 'multiSelect',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: [{}],
         ko:'yes'
       },
       partnerLanguages: {
          name: 'partnerLanguages',
          englishLabel: 'Partner languages',
          germanLabel: 'Sprachen',
          component: 'multiSelectAutoSuggest',
          englishTooltip: 'Which languages should your partner company be capable of for conducting business?',
          germanTooltip: 'Welche Sprachen sollte das potenzielle Partnerunternehmen sprechen?',
          type: 'multiSelectAutoSuggest',
          labelClassName: 'profile-label',
          valueClassName: 'profile-value',
          typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.languages.split('\n'))),
          ko:'yes'
        },
      partnerTechnologyField: {
         name: 'partnerTechnologyField',
         englishLabel: 'Technology Field',
         germanLabel: 'Technologie-Feld',
         component: 'dropdownMultiple',
         englishTooltip: 'Which Technology Field does the company you search for work in?',
         germanTooltip: 'Gibt es bestimmte Technologien, die die Lösung verwenden sollte?',
         type: 'dropdownMultiple',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.technology_application_field.split('\n'))),
         ko:'yes'
       },
       partnerProductClass: {
          name: 'partnerProductClass',
          englishLabel: 'Product class',
          germanLabel: 'Produktklasse',
          component: 'dropdownMultiple',
          englishTooltip: 'Which broad product class does your intended partner work with?',
          germanTooltip: 'Wählen Sie die Produktklassen, die das gesuchte Unternehmen herstellt',
          type: 'dropdownMultiple',
          labelClassName: 'profile-label',
          valueClassName: 'profile-value',
          typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.product_class.split('\n'))),
          ko:'yes'
        },
       partnerProductCategory: {
         name: 'partnerProductCategory',
         englishLabel: 'Product category',
         germanLabel: 'Produkt kategorie',
         component: 'multiSelect',
         englishTooltip: 'Which narrower product category accurately describes the products your intended partner works with?',
         germanTooltip: 'Welche Produkt Kategorien sollte das Unternehmen anbieten?',
         type: 'multiSelect',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: [{}],
         ko:'yes'
       },
       partnerDigitalizationScopeMin: {
         name: 'partnerDigitalizationScopeMin',
         englishLabel: 'Digitalization scope (min.)',
         germanLabel: 'Digitalisierungsstadium (min.)',
         component: 'dropdown',
         validations: '15',
         englishTooltip: 'Which level of digitalization are you aiming for with this strategic partnership?',
         germanTooltip: 'Welches Digitalisierungsstadium sollten die Produkte und Dienstleistungen des Unternehmens mindestens ermöglichen?',
         type: 'dropdown',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         ko:'yes',
         special: 'checkbox-style-for-long-text',
         typeValues: ['Not digital', 'Digital documentation', 'Digital communication', 'Digital media presence (website, social media,...)', 'Digital data systems (ERP, CRM, CMS, …)', 'Automated data gathering', 'Automated data analytics', 'Digital hardware connection (Sensor data)', 'Hardware device communication (Internet of Things)', 'Artificial Intelligence & information processes', 'Artificial Intelligence & physical processes (Robotics)']
       },
       partnerFtes: {
         name: 'partnerFtes',
         englishLabel: 'Full-time Employees',
         germanLabel: 'Vollzeit-Mitarbeiter',
         component: 'dropdownMultiple',
         englishTooltip: 'How many full-time employees should the company roguhly have?',
         germanTooltip: 'Wie viele Vollzeit-Mitarbeiter sollte das Unternehmen haben?',
         validations: '50',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         type: 'dropdownMultiple',
         typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.employees.split('\n'))),
         ko:'no'
      },
      partnerStandardsCertifications: {
         name: 'partnerStandardsCertifications',
         englishLabel: 'Standards & Certificates',
         germanLabel: 'Standards & Zertifizierungen',
         component: 'multiSelect',
         englishTooltip: 'Are there any product or industry standards that need to be followed?',
         germanTooltip: 'Gibt es Anforderungen an die Kapazität und Skalierbarkeit der Lösung, die das Unternehmen anbietet?',
         type: 'multiSelect',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: [{}],
         ko:'no'
       },
       partnerTechnologies: {
          name: 'partnerTechnologies',
          englishLabel: 'Technologies',
          germanLabel: 'Technologien',
          component: 'multiSelect',
          englishTooltip: 'Are there particular technologies that your partner should work with?',
          germanTooltip: 'Sollte das Unternehmen mit bestimmten Technologien arbeiten?',
          type: 'multiSelect',
          labelClassName: 'profile-label',
          valueClassName: 'profile-value',
          typeValues: [{}],
          ko:'yes'
        },
      partnerOtherPartnerCharacteristics: {
         name: 'company123',
         englishLabel: 'Other company characteristics',
         germanLabel: 'Andere Firmeneigenschaften',
         component: 'multiSelect',
         englishTooltip: 'Describe any other partner attributes that you are looking for',
         germanTooltip: 'Gibt es andere Firmeneigenschaften, die noch nicht genannt wurden?',
         type: 'multiSelect',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: [{}],
         ko:'no',
         special: 'checkbox-style-for-big-box'
       }
     }
  }
};
}
