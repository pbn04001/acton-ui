import { NavigationInterface } from './NavigationInterface'

const navigation: NavigationInterface[] = [
  {
    icon: 'home',
    label: 'Home',
    items: [
      {
        label: 'Start',
        settings: ['!isMicrosoftStartPage'],
        url: 'dashboard'
      },
      {
        label: 'Start',
        settings: ['isMicrosoftStartPage'],
        url: 'microsoftStart'
      },
      {
        label: 'Activity',
        url: 'if/home/actonToday.jsp'
      },
      {
        label: 'Dashboard',
        settings: ['!isMicrosoftStartPage'],
        url: 'if/home/dashboard.jsp'
      },
      {
        label: 'Dashboard',
        settings: ['isMicrosoftStartPage'],
        url: 'dashboard/tab/microsoft'
      },
      {
        label: 'Inbox',
        settings: ['canSubscribe'],
        url: 'if/share/inbox.jsp'
      }
    ]
  },
  {
    icon: 'contacts',
    label: 'Contacts',
    items: [
      {
        label: 'Marketing Lists',
        url: 'if/_lists/marketingListing.jsp'
      },
      {
        url: 'entity/filters?model=abm&namespace=abm&type=Account',
        label: 'Accounts',
        settings: ['accountBasedMarketing', 'crmServiceEnabled']
      },
      {
        label: 'Other Lists',
        items: [
          {
            label: 'Account Lists',
            url: 'accountLists'
          },
          {
            label: 'Form Submissions',
            url: 'if/_lists/formSubmissionListing.jsp?full=1'
          },
          {
            label: 'Webinar Lists',
            url: 'if/_lists/webinarListing.jsp?full=1'
          },
          {
            label: 'Bounces & Opt-Outs',
            url: 'if/lists/systemListsListing.jsp'
          },
          {
            label: 'Custom Touch Points',
            url: 'if/custom/customEventsListing.jsp',
            settings: ['customEventsEnabled']
          },
          {
            label: 'Extension Lists',
            url: 'if/lists/listing.jsp?tab=4',
            settings: ['extendedListsSupported']
          },
          {
            label: 'Needs Attention',
            url: 'if/lists/listing.jsp?tab=5',
            settings: ['quarantineEnabled']
          },
          {
            label: 'Trash',
            url: 'if/_lists/recyclebinListing.jsp'
          }
        ]
      },
      {
        label: 'Scoring Rules',
        url: 'scoring',
        settings: ['!nimbusScoringUI']
      },
      {
        label: 'Scoring Rules',
        url: 'of/sc/new',
        settings: ['nimbusScoringUI']
      },
      {
        label: 'Standard Field Names',
        url: 'if/lists/accountSchema.jsp'
      },
      {
        label: 'Subscription Management',
        url: 'if/optinout/settings.jsp',
        settings: ['subscriptionManagementEnabled', 'isAccountAdmin']
      },
      {
        label: 'Search',
        url: 'if/lists/grep.jsp',
        settings: ['!disableBetaSearch']
      }
    ]
  },
  {
    icon: 'content',
    label: 'Content',
    items: [
      {
        label: 'Catalog',
        url: 'sharing'
      },
      {
        label: 'Email Templates',
        url: 'templateLists'
      },
      {
        label: 'Landing Pages',
        url: 'if/_messages/landingPageListing.jsp',
        settings: ['!landingPageListing']
      },
      {
        label: 'Landing Pages',
        url: 'landingPageLists',
        settings: ['landingPageListing']
      },
      {
        label: 'Landing Page Templates',
        url: 'landingPageTemplates'
      },
      {
        label: 'Forms',
        url: 'formsListing'
      },
      {
        label: 'Form Templates',
        url: 'formTemplateLists'
      },
      {
        label: 'Content Fragments',
        url: 'fragmentsLists'
      },
      {
        label: 'A/B Test Content',
        url: 'if/_absplit/ablisting.jsp'
      },
      {
        label: 'Progressive Profiling',
        url: 'if/forms/profileFormsListing.jsp',
        settings: ['!useOnlyNewForms']
      },
      {
        label: 'Form Post URLs',
        url: 'if/account/externalURLS.jsp'
      },
      {
        label: 'Email Headers',
        url: 'if/account/headers.jsp'
      },
      {
        label: 'Email Footers',
        url: 'if/account/footers.jsp'
      },
      {
        label: 'Stationery',
        url: 'if/account/stationery.jsp'
      },
      {
        label: 'Branding',
        url: 'branding'
      },
      {
        label: 'Image Library',
        url: 'imageLibrary'
      },
      {
        label: 'Media Library',
        url: 'if/_docs/mediaListing.jsp'
      }
    ]
  },
  {
    icon: 'inbound',
    label: 'Inbound',
    items: [
      {
        label: 'Website Prospector',
        url: 'if/_wvt/index.jsp'
      },
      {
        label: 'Website Visitor',
        url: 'if/lists/contact.jsp'
      },
      {
        label: 'Twitter Prospector',
        url: 'if/smedia/tweetDashboard.jsp',
        settings: ['!HideTwitterProspector']
      },
      {
        label: 'SEO Audit',
        settings: ['seoEnabled'],
        items: [
          {
            label: 'SEO Audit Web Pages',
            url: 'if/_seo/seoListing.jsp'
          },
          {
            label: 'SEO Audit Landing Pages',
            url: 'if/_seo/seoLPListing.jsp'
          },
          {
            label: 'SEO Audit Forms',
            url: 'if/_seo/seoFormsListing.jsp'
          }
        ]
      },
      {
        label: 'Google AdWords Report',
        url: 'if/_reports/googleAdwords.jsp',
        settings: ['adwordsEnabled']
      },
      {
        label: 'Competitors',
        url: 'if/inbound/websiteWatch.jsp'
      },
      {
        label: 'Website Prospector Alerts',
        url: 'if/beacon/alerts.jsp'
      }
    ]
  },
  {
    icon: 'outbound',
    label: 'Outbound',
    items: [
      {
        label: 'New Message',
        openWindow: {
          url: '../_compose/start.jsp',
          name: '_newComposeBlank'
        },
        settings: ['isNewComposerOnly']
      },
      {
        label: 'New Message',
        openWindow: {
          url: '../compose/start.jsp',
          name: 'compose',
          width: 800,
          popup: true
        },
        settings: ['!isNewComposerOnly']
      },
      {
        label: 'Drafts',
        url: 'if/_messages/emailDraftsListing.jsp',
        settings: ['!draftListing']
      },
      {
        label: 'Drafts',
        url: 'draftLists',
        settings: ['draftListing']
      },
      {
        label: 'Sent Messages',
        url: 'if/_messages/sentMessageListing.jsp'
      },
      {
        label: 'Test Messages',
        url: 'if/messages/listingSent.jsp?type=TEST'
      },
      {
        label: 'Other Messages',
        items: [
          {
            label: 'Awaiting Approval',
            url: 'if/messages/listingScheduled.jsp?approve=1'
          },
          {
            label: 'Scheduled',
            url: 'if/messages/listingScheduled.jsp'
          },
          {
            label: 'Failed',
            url: 'if/messages/listingScheduled.jsp?failed=1'
          },
          {
            label: 'Triggered Messages',
            url: 'if/messages/listingAutoResponse.jsp'
          }
        ]
      },
      {
        label: 'A/B Test Messages',
        url: 'if/messages/listingABTest.jsp'
      },
      {
        label: 'RSS to Email',
        url: 'if/_rss/rssListing.jsp',
        settings: ['isNewComposerOnly']
      },
      {
        label: 'Social Publish',
        url: 'if/socialpub/listingPublished.jsp?type=PUBLISHED'
      }
    ]
  }, {
    icon: 'automation',
    label: 'Automation',
    items: [{
      label: 'programList',
      url: 'Automated Programs'
    }, {
      label: 'List Maintenance Programs',
      url: 'listProgramList'
    }, {
      label: 'Program Templates',
      url: 'programTemplateList'
    }, {
      label: 'Webinars',
      url: 'if/webinar/listing.jsp'
    }, {
      label: 'Campaigns',
      url: 'if/_reports/unifiedCampaigns.jsp',
      settings: ['campaignsEnabled', '!unifiedCampaigns']
    }, {
      label: 'Campaigns',
      url: 'if/campaigns/listing.jsp',
      beta: true,
      settings: ['connectedCampaignsEnabled', 'crmServiceEnabled']
    }, {
      label: 'Projects',
      url: 'if/projects/listing.jsp',
      settings: ['projectsEnabled']
    }, {
      label: 'Marketing Calendar',
      url: 'of/mc/'
    }]
  }
]

export default navigation
