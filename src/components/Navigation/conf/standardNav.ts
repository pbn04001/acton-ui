import {NavigationInterface} from './NavigationInterface'

const navigation:NavigationInterface[] = [{
    icon: 'home',
    label: 'Home',
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
}, {
    icon: 'contacts',
    label: 'Contacts',
    items: [{
        label: 'Marketing Lists',
        url: 'if/_lists/marketingListing.jsp'
    }, {
        url: 'entity/filters?model=abm&namespace=abm&type=Account',
        label: 'Accounts',
        settings: ['accountBasedMarketing', 'crmServiceEnabled']
    }, {
        label: 'Other Lists',
        items: [{
            label: 'Account Lists',
            url: 'accountLists'
        }, {
            label: 'Form Submissions',
            url: 'if/_lists/formSubmissionListing.jsp?full=1'
        }, {
            label: 'Webinar Lists',
            url: 'if/_lists/webinarListing.jsp?full=1'
        }, {
            label: 'Bounces & Opt-Outs',
            url: 'if/lists/systemListsListing.jsp'
        }, {
            label: 'Custom Touch Points',
            url: 'if/custom/customEventsListing.jsp',
            settings: ['customEventsEnabled']
        }, {
            label: 'Extension Lists',
            url: 'if/lists/listing.jsp?tab=4',
            settings: ['extendedListsSupported']
        }, {
            label: 'Needs Attention',
            url: 'if/lists/listing.jsp?tab=5',
            settings: ['quarantineEnabled']
        }, {
            label: 'Trash',
            url: 'if/_lists/recyclebinListing.jsp'
        }]
    }, {
        label: 'Scoring Rules',
        url: 'scoring',
        settings: ['!nimbusScoringUI']
    }, {
        label: 'Scoring Rules',
        url: 'of/sc/new',
        settings: ['nimbusScoringUI']
    }, {
        label: 'Standard Field Names',
        url: 'if/lists/accountSchema.jsp',
    }, {
        label: 'Subscription Management',
        url: 'if/optinout/settings.jsp',
        settings: ['subscriptionManagementEnabled', 'isAccountAdmin']
    }, {
        label: 'Search',
        url: 'if/lists/grep.jsp',
        settings: ['!disableBetaSearch']
    }]
}, {
    icon: 'content',
    label: 'Content',
    items: [{
        label: 'Catalog',
        url: 'sharing'
    }, {
        label: 'Email Templates',
        url: 'templateLists'
    }, {
        label: 'Landing Pages',
        url: 'if/_messages/landingPageListing.jsp',
        settings: ['!landingPageListing']
    }, {
        label: 'Landing Pages',
        url: 'landingPageLists',
        settings: ['landingPageListing']
    }]
}]

export default navigation;