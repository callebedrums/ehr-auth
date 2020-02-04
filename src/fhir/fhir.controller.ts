import { Controller, ChildControllers, Get } from "@overnightjs/core";
import { PatientController } from "./patient.controller";
import { ObservationController } from "./observation.controller";
import { Request, Response } from "express";

@Controller('fhir')
@ChildControllers([
    new PatientController(),
    new ObservationController()
])
export class FHIRController {

    @Get('.well-known/smart-configuration.json')
    getSmartConfiguration(req: Request, res: Response) {
        return this.getMetadata(req, res);
    }

    @Get('metadata')
    getMetadata(req: Request, res: Response) {
        return res.status(200).json(this.metadata);
    }

    private metadata = {
        "resourceType": "CapabilityStatement",
        "id": "smart-app-launch-example",
        "text": {
            "status": "generated",
            "div": `<div>
                    <h2> SMART App Launch Capability Statement Example (Empty) </h2>
                    <div>
                        <p>
                            This is the base Capability Statement for FHIR. It
                            represents a server that supports <em>SMART on FHIR</em> authorization for
                            access, it declares support for automated discovery of OAuth2 endpoints in its
                            CapabilityStatement using the OAuth Uri extension on the
                            <code>rest.security</code> element (or, when using FHIR DSTU2, the
                            <code>Conformance.rest.security</code> element). Any time a client sees this
                            extension, it must be prepared to authorize using SMART’s OAuth2-based
                            protocol.
                        </p>
                        <p>
                            None of the other functionality defined by FHIR is represented
                            in this Capability Statement. It is provided to use as a template for system
                            designers to build their own Capability Statements from. Since a capability
                            statement has to contain something, this contains a read of a Capability
                            Statement
                        </p>
                    </div>
                </div>`
        },
        "url": "http://localhost:8080/fhir/metadata",
        "version": "1.0.0",
        "name": "SMART App Launch Capability Statement Example (Empty)",
        "status": "draft",
        "experimental": true,
        "date": "2020-02-04T20:28:04.521Z",
        "publisher": "Callebe Gomes Healthcare",
        "contact": [
            {
                "telecom": [
                    {
                        "system": "url",
                        "value": "http://hl7.org/fhir"
                    }
                ]
            }
        ],
        "description": `
                This is the base Capability
                Statement for FHIR. It represents a server that supports *SMART on FHIR*
                authorization for access, it declares support for automated discovery of OAuth2
                endpoints in its CapabilityStatement using the OAuth Uri extension on the
                'rest.security' element (or, when using FHIR DSTU2, the
                'Conformance.rest.security' element). Any time a client sees this extension, it
                must be prepared to authorize using SMART’s OAuth2-based protocol.

                None of the other functionality defined by FHIR is represented in this Capability
                Statement. It is provided to use as a template for system designers to build
                their own Capability Statements from. Since a capability statement has to
                contain something, this contains a read of a Capability Statement`,
        "kind": "capability",
        "software": {
            "name": "CG EHR PoC"
        },
        "fhirVersion": "3.0.1",
        "acceptUnknown": "no",
        "format": [
            "xml",
            "json"
        ],
        "rest": [
            {
                "mode": "server",
                "documentation": "An empty Capability Statement",
                "security": {
                    "extension": [
                        {
                            "extension": [
                                {
                                    "url": "token",
                                    "valueUri": "http://localhost:8080/auth/token"
                                },
                                {
                                    "url": "authorize",
                                    "valueUri": "http://localhost:8080/auth/authorize"
                                },
                                {
                                    "url": "manage",
                                    "valueUri": "http://localhost:8080/auth/manage"
                                },
                                {
                                    "url": "introspect",
                                    "valueUri": "http://localhost:8080/auth/introspect"
                                },
                                {
                                    "url": "revoke",
                                    "valueUri": "http://localhost:8080/auth/revoke"
                                }
                            ],
                            "url": "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris"
                        }
                    ],
                    "service": [
                        {
                            "coding": [
                                {
                                    "system": "http://hl7.org/fhir/restful-security-service",
                                    "code": "SMART-on-FHIR"
                                }
                            ],
                            "text": "OAuth2 using SMART-on-FHIR profile (see http://docs.smarthealthit.org)"
                        }
                    ]
                }
            }
        ]
    };
};