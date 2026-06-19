# Project Management Form

A modern, responsive web application for managing college project records. This form provides an intuitive interface for creating new project records and managing existing ones using unique Project IDs.

## 🎯 Features

- **Project Lookup**: Search and retrieve existing project records by Project ID
- **Project Creation**: Create new project records with comprehensive details
- **Project Management**: Update and manage existing project information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations and visual feedback
- **Form Validation**: Status indicators for project ID validation (new vs. existing)
- **Timeline Tracking**: Track assignment dates and project deadlines

## 📋 Form Fields

### Project Identifier
- **Project ID**: Unique identifier for lookup and management

### Project Details
- **Project Name**: Name of the project
- **Assigned To**: Employee or team member assigned to the project

### Timeline
- **Assignment Date**: Date when the project was assigned
- **Deadline**: Project completion deadline

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 3.4.1
- **Libraries**: jQuery 3.5.1
- **Fonts**: Google Fonts (Poppins)
- **Styling**: Custom CSS with gradient backgrounds and modern animations

## 📁 Project Structure

```
ProjectManagementForm/
├── index.html              # Main form application
├── style.css              # Custom styling and responsive design
├── configurations.xml     # NetBeans HTML5 project configuration
└── project.xml           # Project metadata
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/project-management-form.git
cd project-management-form
```

2. Open the application:
   - Simply open `index.html` in your web browser, or
   - Serve it through a local web server:
   ```bash
   python -m http.server 8000
   # or
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser

## 💻 Usage

1. **Enter a Project ID**: Type a unique Project ID in the "Project Identifier" field
2. **Lookup or Create**: 
   - The form will check if the project exists in the database
   - Status indicator will show if it's a new or existing project
3. **Fill in Details**: Complete the project information fields
4. **Take Action**:
   - **Reset**: Clear all form fields
   - **Update**: Modify an existing project
   - **Save Project**: Create a new project record

## 🎨 Design Features

- **Modern Gradient Header**: Blue-to-cyan gradient background
- **Clean Input Fields**: Rounded inputs with focus states and smooth transitions
- **Responsive Layout**: Adapts to different screen sizes
- **Status Indicators**: Visual badges for new vs. existing projects
- **Action Buttons**: 
  - Light Reset button
  - Blue Update button
  - Green Save Project button
- **Accessibility**: Proper form labels and semantic HTML

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with side-by-side date fields
- **Tablet/Mobile**: Optimized single-column layout, full-width buttons

## 🔧 Customization

### Colors
Edit the CSS variables in `style.css`:
- Primary Color: `#2563eb` (Blue)
- Success Color: `#16a34a` (Green)
- Background Gradient: Customizable in the `body` selector

### Fonts
The application uses the Poppins font family from Google Fonts. To change:
1. Modify the `@import` statement in `style.css`
2. Update the `font-family` property

## 🐛 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- IE11 (with polyfills)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please create an issue in the repository or contact the maintainers.

## 🎓 Project Context

This application was developed as part of the College Database (COLLEGE-DB) project management system for educational institutions. It's designed to streamline project tracking and assignment management in academic environments.

---

**Last Updated**: June 2024  
**Status**: Active Development
