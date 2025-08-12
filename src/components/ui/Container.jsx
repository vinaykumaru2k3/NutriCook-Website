import { cn } from '../../utils/cn';

const Container = ({ 
  children, 
  className = '', 
  size = 'default',
  padding = 'default',
  as: Component = 'div',
  ...props 
}) => {
  const sizes = {
    xs: 'max-w-2xl',
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-8xl',
    xl: 'max-w-9xl',
    full: 'max-w-full',
    narrow: 'max-w-3xl',
    wide: 'max-w-screen-2xl',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-3 sm:px-4 lg:px-6',
    default: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16',
  };

  const classes = cn(
    sizes[size],
    'mx-auto',
    paddingClasses[padding],
    className
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

// Section Container with built-in padding
const Section = ({ 
  children, 
  className = '', 
  size = 'default',
  padding = 'default',
  background = 'transparent',
  as: Component = 'section',
  ...props 
}) => {
  const backgroundClasses = {
    transparent: '',
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
    gradient: 'bg-gradient-to-br from-primary-50 to-orange-50',
  };

  return (
    <Component 
      className={cn('section-padding', backgroundClasses[background], className)} 
      {...props}
    >
      <Container size={size} padding={padding}>
        {children}
      </Container>
    </Component>
  );
};

// Grid Container for consistent grid layouts
const Grid = ({ 
  children, 
  className = '', 
  cols = 1,
  gap = 'default',
  responsive = true,
  ...props 
}) => {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4',
    default: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const getColsClass = (cols) => {
    const colsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    };
    
    if (responsive) {
      return colsMap[cols] || `grid-cols-1 lg:grid-cols-${cols}`;
    }
    
    return `grid-cols-${cols}`;
  };

  const classes = cn(
    'grid',
    getColsClass(cols),
    gapClasses[gap],
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Flex Container for consistent flex layouts
const Flex = ({ 
  children, 
  className = '', 
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 'default',
  ...props 
}) => {
  const directionClasses = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    col: 'flex-col',
    'col-reverse': 'flex-col-reverse',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const classes = cn(
    'flex',
    directionClasses[direction],
    alignClasses[align],
    justifyClasses[justify],
    wrap && 'flex-wrap',
    gapClasses[gap],
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Container.Section = Section;
Container.Grid = Grid;
Container.Flex = Flex;

export default Container;