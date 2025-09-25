import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

type ProcessStep = {
  id: number;
  title: string;
  description: string;
};

export const ProcessSection = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: 'Design & Customization',
      description: 'Share your design or choose from our collection. We help refine your ideas and provide digital mockups for approval.'
    },
    {
      id: 2,
      title: 'Material Selection',
      description: 'Select from our premium fabrics and materials. We offer various cotton blends, colors, and fabric weights to match your needs.'
    },
    {
      id: 3,
      title: 'Sampling',
      description: 'We create a sample of your t-shirt for approval, ensuring the fit, print, and quality meet your expectations.'
    },
    {
      id: 4,
      title: 'Production',
      description: 'Once approved, we move to full production with strict quality control at every stage of manufacturing.'
    },
    {
      id: 5,
      title: 'Quality Check & Packaging',
      description: 'Each piece undergoes thorough inspection before being carefully packaged according to your specifications.'
    },
    {
      id: 6,
      title: 'Export & Delivery',
      description: 'We handle all export documentation and logistics, ensuring your order reaches you on time and in perfect condition.'
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Our Manufacturing Process</Text>
      <Text style={styles.sectionSubtitle}>From design to delivery, we ensure quality at every step</Text>
      
      <View style={styles.processContainer}>
        <View style={styles.stepsIndicator}>
          {processSteps.map((_, index) => (
            <React.Fragment key={index}>
              <View 
                style={[
                  styles.stepDot, 
                  index === currentStep && styles.activeStepDot,
                  index < currentStep && styles.completedStepDot
                ]}
              >
                {index < currentStep && <Text style={styles.checkmark}>✓</Text>}
              </View>
              {index < processSteps.length - 1 && (
                <View 
                  style={[
                    styles.stepConnector, 
                    index < currentStep && styles.completedConnector
                  ]} 
                />
              )}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>{processSteps[currentStep].title}</Text>
          <Text style={styles.stepDescription}>{processSteps[currentStep].description}</Text>
          
          <View style={styles.navigation}>
            <TouchableOpacity 
              style={[styles.navButton, currentStep === 0 && styles.disabledButton]} 
              onPress={prevStep}
              disabled={currentStep === 0}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
            
            <View style={styles.stepCounter}>
              <Text style={styles.stepCounterText}>
                Step {currentStep + 1} of {processSteps.length}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton, currentStep === processSteps.length - 1 && styles.disabledButton]} 
              onPress={nextStep}
              disabled={currentStep === processSteps.length - 1}
            >
              <Text style={[styles.navButtonText, styles.nextButtonText]}>
                {currentStep === processSteps.length - 1 ? 'Complete' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.brandNavy,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: 700,
  },
  processContainer: {
    width: '100%',
    maxWidth: 1000,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  stepsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  stepDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  activeStepDot: {
    backgroundColor: colors.brandGold,
    transform: [{ scale: 1.1 }],
  },
  completedStepDot: {
    backgroundColor: colors.brandNavyDim,
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: '#e9ecef',
    marginHorizontal: 4,
  },
  completedConnector: {
    backgroundColor: colors.brandNavyDim,
  },
  stepContent: {
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.brandNavy,
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 32,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.brandNavy,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: colors.brandNavy,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: colors.brandNavy,
    fontWeight: '600',
  },
  nextButtonText: {
    color: '#fff',
  },
  stepCounter: {
    flex: 1,
    alignItems: 'center',
  },
  stepCounterText: {
    color: '#6c757d',
    fontSize: 14,
  },
});
