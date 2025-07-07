export interface Device {
    deviceType: 'desktop' | 'laptop' | 'smartphone' | 'tablet';
    deviceName: string;
    browser: 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera';
    browserIcon: string;
    os: string;
    ip: string;
    location: string;
    added: string;
    lastSession: string;
}
