rm -rf allure-report
npx allure generate allure-results
npx allure open allure-report
echo "Allure report generated and opened successfully."