import { Controller, Get, ClassMiddleware } from "@overnightjs/core";
import { Request, Response } from "express";
import { authenticationMiddleware } from "../auth/jwt";

@Controller('Patient')
@ClassMiddleware([authenticationMiddleware])
export class PatientController {

    @Get(':id')
    get(req: Request, res: Response) {
        return res.status(200).json({
            "resourceType": "Patient",
            "id": "1482713",
            "meta": {
                "lastUpdated": "2015-09-30T14:31:27.885+00:00",
                "versionId": "18619"
            },
            "text": {
                "status": "generated",
                "div": "<div>\n        \n            <p>Susan Clark</p>\n      \n          </div>"
            },
            "name": [
                {
                    "given": [
                        "Susan",
                        "A."
                    ],
                    "use": "official",
                    "family": [
                        "Clark"
                    ]
                }
            ],
            "address": [
                {
                    "country": "USA",
                    "city": "Tulsa",
                    "state": "OK",
                    "use": "home",
                    "line": [
                        "52 Highland St"
                    ],
                    "postalCode": "74116"
                }
            ],
            "gender": "female",
            "telecom": [
                {
                    "system": "phone",
                    "use": "home",
                    "value": "800-576-9327"
                },
                {
                    "system": "email",
                    "value": "susan.clark@example.com"
                }
            ],
            "active": true,
            "birthDate": "2000-12-27",
            "identifier": [
                {
                    "type": {
                        "text": "Medical record number",
                        "coding": [
                            {
                                "code": "MR",
                                "system": "http://hl7.org/fhir/v2/0203",
                                "display": "Medical record number"
                            }
                        ]
                    },
                    "system": "http://hospital.smarthealthit.org",
                    "value": "1482713",
                    "use": "usual"
                }
            ]
        });
    }
}