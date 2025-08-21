# QR Scanner App

A modern, professional QR code scanner built with Angular and ZXing library. This application allows users to scan QR codes using their desktop/laptop camera and provides intelligent handling of different content types.

## Features

- **Camera QR Scanning**: Uses desktop/laptop camera to scan QR codes
- **Smart Content Detection**: Automatically detects and handles:
  - **URLs**: Opens automatically in new browser tab
  - **JSON Data**: Displays formatted JSON with syntax highlighting
  - **Plain Text**: Shows formatted text content
- **Modern UI**: Professional design with Material Design-inspired styling
- **Download Functionality**: Save scanned data as JSON files
- **Responsive Design**: Works on desktop and mobile devices
- **Camera Selection**: Choose between multiple available cameras
- **Copy to Clipboard**: Easy content copying functionality

## Tech Stack

- **Frontend**: Angular 16
- **QR Scanning**: @zxing/ngx-scanner
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome 6

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser with camera access

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd qr-scanner-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4201` (or the port shown in the terminal)

## Usage

### Scanning QR Codes

1. **Grant Camera Permission**: When prompted, allow the app to access your camera
2. **Position QR Code**: Hold the QR code within the scanning frame
3. **Automatic Detection**: The app will automatically detect and process the QR code
4. **View Results**: Results are displayed based on content type:
   - **URLs**: Automatically open in new tab + display in result card
   - **JSON**: Formatted display with syntax highlighting
   - **Text**: Clean text display

### Available Actions

- **Download JSON**: Save the scanned data as a JSON file
- **Copy to Clipboard**: Copy content with one click
- **Rescan**: Start a new scan session
- **Camera Selection**: Switch between available cameras (if multiple)

## Project Structure

```
src/
├── app/
│   ├── app.component.*          # Main app component
│   ├── app.module.ts           # Angular module configuration
│   ├── qr-scanner/
│   │   └── qr-scanner.component.*  # QR scanning functionality
│   └── result-display/
│       └── result-display.component.*  # Result display component
├── styles.css                  # Global styles
├── main.ts                     # Application entry point
└── index.html                  # Main HTML file
```

## Features in Detail

### Content Type Detection

The app intelligently detects the type of content in scanned QR codes:

1. **JSON Detection**: Attempts to parse content as JSON
2. **URL Detection**: Validates if content is a valid URL
3. **Text Fallback**: Treats unrecognized content as plain text

### UI/UX Features

- **Smooth Animations**: Fade-in and slide-up animations
- **Professional Design**: Modern card-based layout with shadows
- **Responsive Layout**: Adapts to different screen sizes
- **Status Indicators**: Clear visual feedback for different states
- **Loading States**: Spinner animations during processing

### Camera Integration

- **Permission Handling**: Graceful camera permission requests
- **Device Selection**: Support for multiple cameras
- **Error Handling**: Clear error messages for camera issues
- **Scanning Overlay**: Visual guide for QR code positioning

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Camera access requires HTTPS in production environments.

## Development

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Code Structure

The application follows Angular best practices with:
- Component-based architecture
- TypeScript for type safety
- Reactive programming patterns
- Modular design

## Troubleshooting

### Camera Not Working

1. **Check Permissions**: Ensure camera access is granted
2. **Browser Support**: Use a modern browser with camera support
3. **HTTPS Required**: Camera access requires HTTPS in production

### Scanner Not Detecting QR Codes

1. **Good Lighting**: Ensure adequate lighting
2. **Steady Position**: Hold the QR code steady within the frame
3. **Clear QR Code**: Make sure the QR code is not damaged or blurry

### Performance Issues

1. **Close Other Apps**: Close other camera-using applications
2. **Browser Refresh**: Try refreshing the page
3. **Clear Cache**: Clear browser cache and cookies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Ensure all dependencies are properly installed

---

**Enjoy scanning QR codes with this modern, professional application!**
