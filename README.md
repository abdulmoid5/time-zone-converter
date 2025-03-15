# TimeZone Converter

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)

> A powerful, efficient, and intuitive time zone conversion application built with React and TypeScript.

TimeZone Converter allows users to seamlessly convert times between multiple time zones with a clean, responsive interface. Perfect for global teams, travel planning, or scheduling international meetings.

## ✨ Features

- **Instant Time Conversion**: Convert times between any combination of global time zones with real-time updates
- **Multiple Target Zones**: Add any number of target time zones for simultaneous comparison
- **Current Time Tracking**: Displays the current time in each selected time zone
- **Time Zone Abbreviations**: Shows time zone abbreviations (EST, GMT, JST, etc.) for clarity
- **Daylight Saving Adjustment**: Automatically handles daylight saving time changes
- **Responsive Design**: Works flawlessly on desktop and mobile devices

## 🛠️ Technologies

- **React 18**: Leveraging the latest features for optimal performance
- **TypeScript**: Full type safety for robust code
- **JavaScript Date & Intl APIs**: Native browser support for accurate time zone handling
- **CSS3**: Custom styling with modern CSS features

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

## 🚀 Installation

1. Clone the repository

```sh
git clone https://github.com/yourusername/timezone-converter.git
cd timezone-converter
```

2. Install dependencies

```sh
yarn install
# or
npm install
```

3. Start the development server

```sh
yarn start
# or
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📖 Usage

### Converting Times

1. **Select Source Time**:
   - Set your desired date using the date picker
   - Set your desired time using the time picker
   - Select the source time zone from the dropdown

2. **Add Target Time Zones**:
   - Select additional time zones from the dropdown under "Add Target Time Zone"
   - Each selected time zone will appear in the "Converted Times" section

3. **View Conversions**:
   - Each time zone card shows:
     - The converted time
     - The corresponding date (important for cross-day conversions)
     - The current time in that time zone
     - The time zone abbreviation

4. **Remove Time Zones**:
   - Click the "Remove" button on any time zone card to remove it from your display

## 📁 Project Structure

```
timezone-converter/
├── public/               # Public assets
├── src/
│   ├── components/       # React components
│   │   ├── TimeZoneConverter.tsx     # Main converter component
│   │   └── TimeZoneConverter.css     # Component styles
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts      # Shared types
│   ├── App.tsx           # Application entry point
│   ├── index.tsx         # React rendering setup
│   └── index.css         # Global styles
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## 🔧 Technical Implementation

### Core Conversion Logic

The time zone conversion system utilizes JavaScript's native `Date` object and the `Intl` API for accurate localization. The conversion process handles:

1. **Timezone Offset Calculation**: Computing the exact offset between time zones
2. **DST Awareness**: Automatically adjusting for daylight saving time changes
3. **Cross-Date Boundary Handling**: Properly displaying date changes when crossing day boundaries

```typescript
// Example of the core conversion function
const getTimezoneOffset = (timeZone: string, date: Date): number => {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
  return utcDate.getTime() - tzDate.getTime();
};
```

### State Management

The application uses React's built-in state management with hooks:

- `useState`: For managing component-level state
- `useEffect`: For handling side effects like timing updates and conversions

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## ✏️ Author

- **Your Name** - [Your GitHub Profile](https://github.com/yourusername)

## 📊 Future Enhancements

- Local storage to remember user's preferred time zones
- Theme switching (light/dark mode)
- Shareable URL links for specific time conversions
- CSV export for multiple conversions
- Favorite/pinned time zones
- Full internationalization support