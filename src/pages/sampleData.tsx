const ChannelData = [
  { id: "1068983906872868914", team: "Butter!" },   // team-1
  { id: "1068983997272690748", team: "Open Team" }, // team-2
  { id: "1068983926317654168", team: "VIP Team" },  // team-3
  { id: "1076336334488211566", team: "" }           // team-4
];

const TeamData = [
  { name: 'Butter!', avg_steps: 8000 },
  { name: 'Open Team', avg_steps: 6000 },
  { name: 'VIP Team', avg_steps: 7000 },
  { name: 'Team 4', avg_steps: 9000 },
  { name: 'Team 5', avg_steps: 5500 },
  { name: 'Team 6', avg_steps: 7200 },
  { name: 'Team 7', avg_steps: 8100 },
  { name: 'Team 8', avg_steps: 6500 },
  { name: 'Team 9', avg_steps: 7800 },
  { name: 'Team 10', avg_steps: 9000 },
  { name: 'Team 11', avg_steps: 5200 },
  { name: 'Team 12', avg_steps: 7600 },
  { name: 'Team 13', avg_steps: 8500 },
  { name: 'Team 14', avg_steps: 6000 },
  { name: 'Team 15', avg_steps: 7300 },
  { name: 'Team 16', avg_steps: 9000 },
  { name: 'Team 17', avg_steps: 5800 },
  { name: 'Team 18', avg_steps: 7800 },
  { name: 'Team 19', avg_steps: 8200 },
  { name: 'Team 20', avg_steps: 6200 }
];

const IndividualData = [
  {
    name: 'John Doe',
    team: 'Team 1',
    email: 'jdoe@gmail.com',
    profile_pic: 'https://example.com/john-doe.jpg',
    totalStep: 10000
  },
  {
    name: 'Jane Smith',
    team: 'Team 1',
    email: 'jsmith@pdx.edu',
    profile_pic: 'https://example.com/jane-smith.jpg',
    totalStep: 12000
  },
  {
    name: 'Bob Johnson',
    team: 'Team 1',
    email: 'bjohnson@pdx.edu',
    profile_pic: 'https://example.com/bob-johnson.jpg',
    totalStep: 9000
  },
  {
    name: 'Alice Williams',
    team: 'Team 2',
    email: 'awilliams@pdx.edu',
    profile_pic: 'https://example.com/alice-williams.jpg',
    totalStep: 14000
  },
  {
    name: 'Charlie Brown',
    team: 'Team 2',
    email: 'cbrown@gmail.com',
    profile_pic: 'https://example.com/charlie-brown.jpg',
    totalStep: 8000
  },
  {
    name: 'Emily Davis',
    team: '',
    email: 'edavis@gmail.com',
    profile_pic: 'https://example.com/emily-davis.jpg',
    totalStep: 11000
  },
  {
    name: 'Michael Martinez',
    team: 'Team 2',
    email: 'mmartinez@gmail.com',
    profile_pic: 'https://example.com/michael-martinez.jpg',
    totalStep: 12500
  },
  {
    name: 'Jessica Garcia',
    team: '',
    email: 'jgarcia@pdx.edu',
    profile_pic: 'https://example.com/jessica-garcia.jpg',
    totalStep: 9000
  },
  {
    name: 'David Rodriguez',
    team: 'Team 5',
    email: 'drodriguez@hotmail.com',
    profile_pic: 'https://example.com/david-rodriguez.jpg',
    totalStep: 13000
  },
  {
    name: 'Samantha Turner',
    team: 'Team 2',
    email: 'sturner@aol.com',
    profile_pic: 'https://example.com/samantha-turner.jpg',
    totalStep: 10000
  },
  {
    name: 'Ashley Phillips',
    team: 'Team 6',
    email: 'aphillips@pdx.edu',
    profile_pic: 'https://example.com/ashley-phillips.jpg',
    totalStep: 12000
  },
  {
    name: 'Brian Lewis',
    team: 'Team 9',
    email: 'nlewis@pdx.edu',
    profile_pic: 'https://example.com/brian-lewis.jpg',
    totalStep: 9000
  },
  {
    name: 'Amanda Lee',
    team: 'Team 10',
    email: 'alee@pdx.edu',
    profile_pic: 'https://example.com/amanda-lee.jpg',
    totalStep: 14000
  },
  {
    name: 'Justin Scott',
    team: 'Team 9',
    email: 'jscott@gmail.com',
    profile_pic: 'https://example.com/justin-scott.jpg',
    totalStep: 8000
  },
  {
    name: 'Brandon Perez',
    team: 'Team 8',
    email: 'bperez@gmail.com',
    profile_pic: 'https://example.com/brandon-perez.jpg',
    totalStep: 11000
  }
];

const PreSurvey = [
  {
    anonymous_id: 1,
    psu_affiliation: 'student',
    heard_about: 'Word of mouth',
    weekly_physical_activity_hours: 3,
    weekly_physical_activity_minutes: 45,
    distance_from_campus: 'On campus',
    rec_center_frequency: 'Never'
  }, {
    anonymous_id: 2,
    psu_affiliation: 'student',
    heard_about: 'Flyer',
    weekly_physical_activity_hours: 1,
    weekly_physical_activity_minutes: 15,
    distance_from_campus: '5 miles',
    rec_center_frequency: 'Sometimes'
  }, {
    anonymous_id: 3,
    psu_affiliation: 'faculty',
    heard_about: 'Social Media',
    weekly_physical_activity_hours: 4,
    weekly_physical_activity_minutes: 45,
    distance_from_campus: 'On campus',
    rec_center_frequency: 'Often'
  }
];

const PostSurvey = [
  {
    anonymous_id: 1,
    weekly_physical_activity_hours: 7,
    weekly_physical_activity_minutes: 45,
    participated_events: 'sunset walk',
    future_walk_ideas: '',
    walktober_improved_health: 4,
    walktober_improved_community: 3,
    would_participate_again: 5,
    if_not_why: '',
    feedback: ''
  }, {
    anonymous_id: 2,
    weekly_physical_activity_hours: 1,
    weekly_physical_activity_minutes: 15,
    participated_events: '',
    future_walk_ideas: '',
    walktober_improved_health: 3,
    walktober_improved_community: 3,
    would_participate_again: 3,
    if_not_why: '',
    feedback: 'more indoor walks '
  }, {
    anonymous_id: 5,
    weekly_physical_activity_hours: 0,
    weekly_physical_activity_minutes: 45,
    participated_events: 'sunset walk',
    future_walk_ideas: '',
    walktober_improved_health: 5,
    walktober_improved_community: 5,
    would_participate_again: 5,
    if_not_why: 'I hate exercise ',
    feedback: ''
  }
];

const Devices = {
  iPhone: 34,
  android: 76,
	apple_health:	134,
  fitbit: 45,
  google_health:	36
};

export { ChannelData, TeamData, IndividualData, PreSurvey, PostSurvey, Devices };
