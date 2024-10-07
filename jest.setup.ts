import '@testing-library/jest-dom';
// import { cleanup } from '@testing-library/react';

export const dateString = "2024-10-06T19:40:55.221Z";
export const dateValue = new Date(dateString);
export const locale = "en-EN";
export const formatDateTimeOptions: Intl.DateTimeFormatOptions = { dateStyle: "medium", timeStyle: "medium" };

// afterEach(cleanup);