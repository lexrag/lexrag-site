// 'use client';

// import { useState } from 'react';
// import CardWrapper from '@/components/ui/card-wrapper';
// import { Switch } from '@/components/ui/switch';
// import Row from '../components/Row';

// const NOTIFICATION_METHODS = [
//     { key: 'sms', label: 'SMS', description: 'Receive notifications via SMS' },
//     { key: 'email', label: 'Email', description: 'Receive notifications via email' },
//     { key: 'push', label: 'Push Notifications', description: 'Receive notifications via push notifications' },
// ];

// const Nofications = () => {
//     const [active, setActive] = useState('sms');

//     return (
//         <CardWrapper title="Notifications">
//             {NOTIFICATION_METHODS.map((method) => (
//                 <Row
//                     key={method.key}
//                     label={method.label}
//                     actionIcon={
//                         <Switch
//                             id={method.key}
//                             aria-label={`Toggle ${method.label}`}
//                             checked={active === method.key}
//                             onCheckedChange={() => setActive(method.key)}
//                         />
//                     }
//                 >
//                     <span>{method.description}</span>
//                 </Row>
//             ))}
//         </CardWrapper>
//     );
// };

// export default Nofications;
