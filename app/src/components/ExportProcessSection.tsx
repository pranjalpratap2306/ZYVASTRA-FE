import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutChangeEvent, useWindowDimensions, Animated } from 'react-native';
import { colors } from '../theme/colors';

type ExportStep = {
  id: number;
  title: string;
  description: string;
};

export const ExportProcessSection = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const exportSteps: ExportStep[] = [
    {
      id: 1,
      title: 'Understanding Your Needs',
      description: 'We begin by thoroughly understanding your specific requirements, including design specifications, quality standards, quantities, and delivery timelines.'
    },
    {
      id: 2,
      title: 'Sourcing & Sample Dispatch',
      description: 'Our team sources the finest, sustainable materials from trusted suppliers. We then prepare and dispatch initial samples for your approval before proceeding with the full order.'
    },
    {
      id: 3,
      title: 'Production & Manufacturing',
      description: 'Once the sample is approved, our skilled teams begin the bulk manufacturing process, from precise fabric cutting to final stitching, adhering strictly to the approved specifications.'
    },
    {
      id: 4,
      title: 'Quality Assurance',
      description: 'Our dedicated QA team conducts rigorous multi-stage inspections during and after production. We check everything from seam strength to print quality to ensure every t-shirt meets our highest standards.'
    },
    {
      id: 5,
      title: 'Custom Packaging & Labeling',
      description: 'We handle all custom packaging, tagging, and labeling according to your brand guidelines and international shipping requirements, ensuring your products are retail-ready.'
    },
    {
      id: 6,
      title: 'Documentation & Compliance',
      description: 'Our logistics experts meticulously prepare all necessary export documents (like the Bill of Lading, Commercial Invoice, and Certificate of Origin) for a smooth and compliant customs clearance process.'
    },
    {
      id: 7,
      title: 'Shipping & Logistics',
      description: 'We manage the entire freight process, securely packing your order into containers and ensuring it is safely transported from our facility to the designated port for departure.'
    },
    {
      id: 8,
      title: 'Shipment Tracking & Delivery',
      description: 'You receive real-time tracking information, allowing you to monitor your shipment from port to port until it safely reaches its destination.'
    }
  ];

  const animateStepChange = (newIndex: number, direction: 'next' | 'prev') => {
    const slideOutTo = direction === 'next' ? -width : width;
    const slideInFrom = direction === 'next' ? width : -width;

    Animated.parallel([
      Animated.timing(slideAnim, { toValue: slideOutTo, duration: 250, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => {
      setCurrentIndex(newIndex);
      slideAnim.setValue(slideInFrom);
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentIndex < exportSteps.length - 1) {
      animateStepChange(currentIndex + 1, 'next');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      animateStepChange(currentIndex - 1, 'prev');
    }
  };

  const styles = getStyles(isNarrow);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Our Seamless Export Process</Text>
        <Text style={styles.sectionSubtitle}>
          At Zyvastra, we follow a transparent, quality-driven process to deliver India’s most authentic apparel – fresh, safe, and traceable from farm to port.
        </Text>
        
        {isNarrow ? (
          // Simplified Vertical Layout for Mobile
          <View style={styles.mobileTimelineContainer}>
            <Animated.View style={[styles.mobileStepContent, { opacity: opacityAnim, transform: [{ translateX: slideAnim }] }]}>
              <Text style={styles.stepTitle}>{exportSteps[currentIndex].title}</Text>
              <Text style={styles.stepDescription}>{exportSteps[currentIndex].description}</Text>
            </Animated.View>
            <View style={styles.mobileDots}>
              {exportSteps.map((_, i) => (
                <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
              ))}
            </View>
          </View>
        ) : (
          // Horizontal Timeline for Desktop
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View 
              style={styles.timelineWrap}
              onLayout={(e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width)}
            >
              <View style={styles.timelineLine} />
              <View style={[styles.timelineProgress, { width: `${(currentIndex / (exportSteps.length - 1)) * 100}%` }]} />

              {exportSteps.map((step, i) => {
                const isCompleted = i < currentIndex;
                const isActive = i === currentIndex;
                const position = containerWidth > 0 ? `${(i / (exportSteps.length - 1)) * 100}%` : '0%';

                return (
                  <View key={step.id} style={[styles.stepContainer, { left: position }]}>
                    <View style={[styles.dot, isCompleted && styles.dotCompleted, isActive && styles.dotActive]} />
                  </View>
                );
              })}
            </View>
            <Animated.View style={[styles.desktopStepContent, { opacity: opacityAnim, transform: [{ translateX: slideAnim }] }]}>
              <Text style={styles.stepTitle}>{exportSteps[currentIndex].title}</Text>
              <Text style={styles.stepDescription}>{exportSteps[currentIndex].description}</Text>
            </Animated.View>
          </View>
        )}

        <View style={styles.navigation}>
          <Pressable onPress={handlePrev} disabled={currentIndex === 0} style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}>
            <Text style={styles.navButtonText}>Prev</Text>
          </Pressable>
          <Pressable onPress={handleNext} disabled={currentIndex === exportSteps.length - 1} style={[styles.navButton, currentIndex === exportSteps.length - 1 && styles.navButtonDisabled]}>
            <Text style={styles.navButtonText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const getStyles = (isNarrow: boolean) => StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: isNarrow ? 60 : 100,
    paddingBottom: isNarrow ? 80 : 120,
    backgroundColor: '#F5F0E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isNarrow ? 40 : 60, // Add margin below the section
  },
  contentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 1000,
  },
  sectionTitle: {
    fontSize: isNarrow ? 28 : 34,
    fontWeight: '800',
    color: colors.brandNavy,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  sectionSubtitle: {
    fontSize: isNarrow ? 16 : 18,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 600,
    marginBottom: 60,
    lineHeight: 24,
    fontFamily: 'serif',
  },
  // Mobile Styles
  mobileTimelineContainer: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  mobileStepContent: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileDots: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  // Desktop Styles
  timelineWrap: {
    width: '100%',
    height: 60,
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 32,
  },
  desktopStepContent: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  timelineProgress: {
    position: 'absolute',
    left: 0,
    top: '50%',
    height: 2,
    backgroundColor: colors.brandNavy,
    transition: 'width 0.3s ease-in-out',
  },
  stepContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }], // Center dot on the line
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F0E5',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
  },
  dotCompleted: {
    backgroundColor: colors.brandNavy,
    borderColor: colors.brandNavy,
  },
  dotActive: {
    borderColor: colors.brandNavy,
    transform: [{ scale: 1.2 }],
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 500,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 32,
  },
  navButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: colors.brandNavy,
    borderWidth: 1,
    borderColor: colors.brandNavy,
    transition: 'opacity 0.3s',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
