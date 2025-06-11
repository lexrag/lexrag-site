// adjust Data for template generation depending on the use case
import React from 'react';
import fs from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import VerificationEmail from '../../components/EmailTemplates/VerificationEmail';

// Data for template generation – using test data or placeholders
const testData = {
  userName: '{user}',               // placeholder for the user's name
  verificationCode: '{verification_code}' // placeholder for the verification code
};

// Render the component to static HTML
const htmlOutput =
  '<!DOCTYPE html>' +
  renderToStaticMarkup(
    <VerificationEmail 
      userName={testData.userName} 
      verificationCode={testData.verificationCode} 
    />
  );

// Define the folder where the generated templates will be saved (e.g., "static-templates")
const outputDir = path.join(process.cwd(), 'static-templates');

// If the folder does not exist, create it
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Write the HTML to a file (e.g., VerificationEmail.html)
const outputFilePath = path.join(outputDir, 'VerificationEmail.html');
fs.writeFileSync(outputFilePath, htmlOutput);

console.log(`Template generated successfully: ${outputFilePath}`);
