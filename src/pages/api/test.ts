import type { NextApiRequest, NextApiResponse } from 'next';
import { diff_match_patch } from 'diff-match-patch';
import { parsedChanges1 } from '../../utils/test';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dmp = new diff_match_patch();

    const response = dmp.diff_main(
      'Drives & Inverters Power Supply teri amma ka bhsda Sensors & Measurements Factory Automation Systems Distribution & Controls Transmission & Distribution Social Infrastructure Energy Management Food and Beverage Equipment Upgrades Drives & Inverters Power Supply Sensors & Measurements Factory Automation Systems Distribution & Controls Transmission & Distribution Social Infrastructure Energy Management Equipment Upgrades AC Drives (Low voltage) AC Drives (Medium voltage) Servo Systems UPS, Uninterruptible Power System Solar Inverters Data Center Large-Capacity Rectifier, S-Former Radiation Monitoring PLC, Programmable logic controller HMI, Human machine interface Process Control System, MICREX-NX Monitoring and Control System, MICREX-VieW XX Process Data Acquisition and analysis, f(s)NISDAS Steel EMS Solution Steel EMS Package LITE Boiler Combustion solution LV Distribution Motor Control Energy Control Equipment MV Distribution Oil-immersed Transformer, Shunt Reactor Cast Resin Transformer, MOLTRA GIS, Gas Insulated Switchgear MV & LV Switchgear and Control Center DC High-speed Vacuum Circuit Breaker Pure Water Vaporization Cooling Silicon Rectifier Tunnel Ventilation System Marine Environment Protection Electrical Equipment for Railcars Thermal Power Generation Geothermal Power Generation Nuclear Power Fuel Cell Power System Simulator Can & PET Bottle Beverage Vending Machine Coin Mechanism Bill Validator Fuji Electric Solution IoT System Solution Service Solution After Sales Services Medium-Voltage Devices in the Panel Low-Voltage Electric Distribution Devices AC Drives (Medium voltage) UPS, Uninterruptible Power System Monitoring and Control Systems AC Drives (Low voltage)',
      'Drives & Inverters Power Supply Sensors & Measurements Factory Automation Systems Distribution & Controls Transmission & Distribution Social Infrastructure Energy Management Food and Beverage Equipment Upgrades Drives & Inverters Power Supply Sensors & Measurements Factory Automation Systems Distribution & Controls Transmission & Distribution Social Infrastructure Energy Management Equipment Upgrades AC Drives (Low voltage) AC Drives (Medium voltage) Servo Systems UPS, Uninterruptible Power System Solar Inverters Data Center Large-Capacity Rectifier, S-Former Radiation Monitoring PLC, Programmable logic controller HMI, Human machine interface Process Control System, MICREX-NX Monitoring and Control System, MICREX-VieW XX Process Data Acquisition and analysis, f(s)NISDAS Steel EMS Solution Steel EMS Package LITE Boiler Combustion solution LV Distribution Motor Control Energy Control Equipment MV Distribution Oil-immersed Transformer, Shunt Reactor Cast Resin Transformer, MOLTRA GIS, Gas Insulated Switchgear MV & LV Switchgear and Control Center DC High-speed Vacuum Circuit Breaker Pure Water Vaporization Cooling Silicon Rectifier Tunnel Ventilation System Marine Environment Protection Electrical Equipment for Railcars Thermal Power Generation Geothermal Power Generation Nuclear Power Fuel Cell Power System Simulator Multipurpose Vending Machine Can & PET Bottle Beverage Vending Machine Coin Mechanism Bill Validator Fuji Electric Solution IoT System Solution Service Solution After Sales Services Medium-Voltage Devices in the Panel Low-Voltage Electric Distribution Devices AC Drives (Medium voltage) UPS, Uninterruptible Power System Monitoring and Control Systems AC Drives (Low voltage)'
    );

    // const response = dmp.diff_main()
    dmp.diff_cleanupSemantic(response)
    res.status(200).json({ response }); // res.status(200).json({ name: 'John Doe' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // handle error of type Error
      res.status(500).json({ error: error.message });
    } else {
      // handle error of unknown type
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
