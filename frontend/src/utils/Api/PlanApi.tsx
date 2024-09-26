interface Plans{
    id:number;
    device:string;
    deviceSize:string;
    monthlyPrice:number;
    quality:string;
    resolution:string;
    supportedDevices:string;
    numberOfDevice:number;
    downloadDevices:number;
}

export const ChoosePlans : Plans[]=[
    {
        id:1,
        device:"Mobile",
        deviceSize:"480p",
        monthlyPrice:250,
        quality:"Fair",
        resolution:"480p",
        supportedDevices:"Mobile phone, tablet",
        numberOfDevice:1,
        downloadDevices:1,
    },
    {
        id:2,
        device:"Basic",
        deviceSize:"720p",
        monthlyPrice:450,
        quality:"Good",
        resolution:"720p (HD)",
        supportedDevices:"TV, computer, mobile phone, tablet",
        numberOfDevice:1,
        downloadDevices:1,
    },
    {
        id:3,
        device:"Standard",
        deviceSize:"1080p",
        monthlyPrice:800,
        quality:"Great",
        resolution:"1080p (Full HD)",
        supportedDevices:"TV, computer, mobile phone, tablet",
        numberOfDevice:2,
        downloadDevices:2,
    },
    {
        id:4,
        device:"Premium",
        deviceSize:"4K + HDR",
        monthlyPrice:800,
        quality:"Best",
        resolution:"4K (Ultra HD) + HDR",
        supportedDevices:"TV, computer, mobile phone, tablet",
        numberOfDevice:4,
        downloadDevices:6,
    }
]