import {NavigationInterface} from './NavigationInterface'

const navigation:NavigationInterface[] = [{
    icon: '',
    label: 'Home',
    dynamicNav: 0,
    items: [{
        label: 'Start',
        settings: ['!isMicrosoftStartPage'],
        url: 'dashboard'
    }, {
        label: 'Start',
        settings: ['isMicrosoftStartPage'],
        url: 'microsoftStart'
    }, {
        label: 'Activity',
        url: 'if/home/actonToday.jsp'
    }, {
        label: 'Dashboard',
        settings: ['!isMicrosoftStartPage'],
        url: 'if/home/dashboard.jsp'
    }, {
        label: 'Dashboard',
        settings: ['isMicrosoftStartPage'],
        url: 'dashboard/tab/microsoft'
    }, {
        label: 'Inbox',
        settings: ['canSubscribe'],
        url: 'if/share/inbox.jsp'
    }]
}]

export default navigation;