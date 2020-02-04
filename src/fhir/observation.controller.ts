import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller('Observation')
export class ObservationController {

    @Get('')
    getAll(req: Request, res: Response) {
        return res.status(200).json({
            "total": 3,
            "resourceType": "Bundle",
            "type": "searchset",
            "entry": [
                {
                    "search": {
                        "mode": "match"
                    },
                    "resource": {
                        "resourceType": "Observation",
                        "effectiveDateTime": "2003-11-28",
                        "id": "428-height",
                        "text": {
                            "status": "generated",
                            "div": "<div>2003-11-28: height = 115.316 cm</div>"
                        },
                        "meta": {
                            "versionId": "19628",
                            "lastUpdated": "2015-09-30T14:31:29.576+00:00"
                        },
                        "code": {
                            "text": "height",
                            "coding": [
                                {
                                    "system": "http://loinc.org",
                                    "code": "8302-2",
                                    "display": "height"
                                }
                            ]
                        },
                        "encounter": {
                            "reference": "Encounter/428"
                        },
                        "subject": {
                            "reference": "Patient/1482713"
                        },
                        "status": "final",
                        "valueQuantity": {
                            "unit": "cm",
                            "system": "http://unitsofmeasure.org",
                            "value": 115.316,
                            "code": "cm"
                        }
                    },
                    "fullUrl": "https://r2.smarthealthit.org/Observation/428-height"
                },
                {
                    "search": {
                        "mode": "match"
                    },
                    "resource": {
                        "code": {
                            "text": "weight",
                            "coding": [
                                {
                                    "code": "3141-9",
                                    "system": "http://loinc.org",
                                    "display": "weight"
                                }
                            ]
                        },
                        "meta": {
                            "lastUpdated": "2015-09-30T14:31:29.645+00:00",
                            "versionId": "19676"
                        },
                        "valueQuantity": {
                            "system": "http://unitsofmeasure.org",
                            "unit": "kg",
                            "value": 18.55193,
                            "code": "kg"
                        },
                        "status": "final",
                        "subject": {
                            "reference": "Patient/1482713"
                        },
                        "encounter": {
                            "reference": "Encounter/428"
                        },
                        "id": "428-weight",
                        "effectiveDateTime": "2003-11-28",
                        "resourceType": "Observation",
                        "text": {
                            "status": "generated",
                            "div": "<div>2003-11-28: weight = 18.55193 kg</div>"
                        }
                    },
                    "fullUrl": "https://r2.smarthealthit.org/Observation/428-weight"
                },
                {
                    "fullUrl": "https://r2.smarthealthit.org/Observation/428-bmi",
                    "search": {
                        "mode": "match"
                    },
                    "resource": {
                        "subject": {
                            "reference": "Patient/1482713"
                        },
                        "status": "final",
                        "valueQuantity": {
                            "value": 13.9,
                            "code": "kg/m2",
                            "unit": "kg/m2",
                            "system": "http://unitsofmeasure.org"
                        },
                        "encounter": {
                            "reference": "Encounter/428"
                        },
                        "meta": {
                            "lastUpdated": "2015-09-30T14:31:29.663+00:00",
                            "versionId": "19688"
                        },
                        "code": {
                            "text": "bmi",
                            "coding": [
                                {
                                    "code": "39156-5",
                                    "system": "http://loinc.org",
                                    "display": "bmi"
                                }
                            ]
                        },
                        "text": {
                            "div": "<div>2003-11-28: bmi = 13.9 kg/m2</div>",
                            "status": "generated"
                        },
                        "effectiveDateTime": "2003-11-28",
                        "id": "428-bmi",
                        "resourceType": "Observation"
                    }
                }
            ]
        });
    }
}