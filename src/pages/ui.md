# Meal Plan Page UI Documentation

## Overview
The Meal Plan Page is a comprehensive interface for users to create personalized thali (meal) plans based on their dietary preferences, health requirements, and cultural preferences. The page features a modern, responsive design with a sidebar layout and main content area.

## Layout Structure

### 1. Sidebar (Left Panel)
- **Position**: Fixed on the left side
- **Width**: 300px
- **Scrollable**: Yes, with thin scrollbar
- **Background**: White

#### Components:
1. **Quick Actions**
   - Notification Bell with counter
   - Print button
   - Share button
   - Style: Light blue background with hover effect

2. **Weekly Statistics**
   - Total Calories counter
   - Average Protein intake
   - Day Streak counter
   - Style: Card layout with large numbers

3. **Meal Calendar**
   - Monthly view
   - Clickable dates
   - Meal plan indicators
   - Header with calendar icon

4. **Saved Meals**
   - List of bookmarked meals
   - Quick access to favorites
   - Bookmark icon for each entry

### 2. Main Content (Right Panel)

#### Hero Section
- Large title: "Your Personalized Thali Builder"
- Subtitle with AI-powered description
- Animated entrance effect

#### Filter Bar
- Quick filter tags: All, Recent, Favorites, High Protein, Low Carb
- Horizontal scrollable on mobile
- Active state indication

#### Feature Cards Grid

1. **Thali Builder Card**
   - Diet type selection (6 options)
   - Cuisine dropdown
   - Animated scale effect on hover

2. **Health Preferences Card**
   - Toggle buttons for preferences
   - Visual feedback for active state
   - Icon indicators

3. **Voice Input Card**
   - Microphone button
   - Active state animation
   - Error message display

4. **Photo Upload Card**
   - Drag & drop zone
   - Upload progress indicator
   - Preview area

5. **Seasonal Foods Card**
   - Season selector (Summer, Winter, Monsoon)
   - Dynamic food recommendations
   - Categorized lists

#### Meal Plan Results Section

1. **Action Bar**
   - Save meal button
   - Export to PDF button
   - Share options

2. **Thali Components**
   - Main dish display
   - Side dishes
   - Accompaniments
   - Card-based layout

3. **Nutrition Information**
   - Calories, Protein, Carbs, Fats
   - Icon indicators
   - Visual chart representation

4. **Health Tips**
   - Bulleted list
   - Scrollable container
   - Highlighted important points

5. **Substitutes Section**
   - Alternative ingredients
   - Healthier options
   - Expandable details

## Color Scheme
- Primary: #3b82f6 (Blue)
- Secondary: #10b981 (Green)
- Accent: #f59e0b (Orange)
- Text: #2d3748 (Dark Gray)
- Background: #f8fafc (Light Gray)
- Success: #48bb78 (Green)
- Error: #e53e3e (Red)

## Typography
- Headings: System font stack, semi-bold
- Body: System font stack, regular
- Sizes:
  - H1: 2.5rem
  - H2: 1.3rem
  - Body: 1rem
  - Small: 0.9rem

## Responsive Behavior

### Desktop (>1024px)
- Two-column layout
- Fixed sidebar
- Grid-based feature cards

### Tablet (768px - 1024px)
- Single column layout
- Horizontal sidebar sections
- Adjusted grid columns

### Mobile (<768px)
- Single column layout
- Stacked components
- Full-width cards
- Collapsible sections
- Simplified calendar view

## Animations
1. **Page Load**
   - Fade in and slide up for hero section
   - Staggered card appearances

2. **Interactions**
   - Hover lift effect on cards
   - Smooth transitions for buttons
   - Pulse animation for voice recording
   - Loading spinners for processes

3. **State Changes**
   - Smooth transitions for active states
   - Fade effects for modal dialogs
   - Slide animations for expandable content

## Accessibility Features
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast mode support
- Screen reader friendly structure
- Focus indicators
- Alternative text for icons

## Performance Considerations
- Lazy loading for images
- Optimized animations
- Efficient grid layouts
- Minimal DOM nesting
- Responsive image loading
- Cached meal plans

## Error States
- Form validation feedback
- API error handling
- Offline mode indicators
- Loading states
- Empty state designs

## Future Enhancements
1. Dark mode support
2. More cuisine options
3. Recipe sharing features
4. Advanced filtering
5. Meal plan templates
6. Social features
7. Integration with health apps
8. Custom theme options 