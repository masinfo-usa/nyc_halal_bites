import React from 'react';
import { Skeleton, Box as MuiBox, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Helper function to recursively generate skeletons
const generateSkeletons = (children) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const { type, props } = child;

      {console.log("child:", child)}
      // Handle Box component
      if (type === MuiBox) {
        const { style, children } = props;
        const flexStyle = style?.display || 'block';  // Check if it's flex or block
        const marginTop = style?.marginTop || '0px';

        // If the Box contains an img, create a skeleton for the image
        if (children && children.type === 'img') {
          return (
            <MuiBox
              display={flexStyle}
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop }}
            >
              <Skeleton
                variant="rectangular"
                width={props.width || 200}
                height={props.height || 200}
                sx={{ borderRadius: '8px' }}
              />
            </MuiBox>
          );
        }

        // Recursively generate skeletons for nested children in Box
        return (
          <MuiBox
            display={flexStyle}
            justifyContent={props.justifyContent || 'flex-start'}
            alignItems={props.alignItems || 'flex-start'}
            sx={{ marginTop }}
          >
            {generateSkeletons(children)}  {/* Recursively handle nested children */}
          </MuiBox>
        );
      }

      // Handle Typography component (for text-based skeletons)
      if (type === Typography) {
        return (
          <Skeleton
            variant="text"
            width={props.children.length * 8 || 150}  // Dynamically adjust based on text length
            sx={{ marginBottom: '8px' }}
          />
        );
      }

      // Handle img element directly
      if (type === 'img') {
        return (
          <Skeleton
            variant="rectangular"
            width={props.width || 200}
            height={props.height || 200}
            sx={{ borderRadius: '8px', marginBottom: 2 }}
          />
        );
      }

      // Handle Accordion and its children
      if (type === Accordion) {
        return (
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ marginBottom: '16px' }} />
        );
      }

      // Handle AccordionSummary and AccordionDetails (text-based)
      if (type === AccordionSummary || type === AccordionDetails) {
        return (
          <Skeleton variant="text" width="100%" sx={{ marginBottom: '8px' }} />
        );
      }

      // Return null for any unknown component types
      return null;
    }

    // Return null if the child is not a valid React element
    return null;
  });
};

// HOC to wrap and show Skeleton while loading
const withLoadingSkeleton = () => {
  return function WithLoadingSkeleton({ isLoading, children }) {
    return (
      <MuiBox
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        height="100%"  // Ensure it's vertically centered
        sx={{ width: '100%', padding: '16px' }}
      >
        

        {isLoading ? (

          generateSkeletons(children) // Recursively generate skeletons
        ) : (
          children // Render the actual children when loading is complete
        )}
      </MuiBox>
    );
  };
};

export default withLoadingSkeleton;
