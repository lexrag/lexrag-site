"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/generateTemplates.tsx
var react_1 = require("react");
var fs_1 = require("fs");
var path_1 = require("path");
var server_1 = require("react-dom/server");
var VerificationEmail_1 = require("../src/components/EmailTemplates/VerificationEmail");
// Данные для генерации шаблона – используем тестовые данные или маркеры
var testData = {
    userName: '{user}', // placeholder для имени пользователя
    verificationCode: '{verification_code}' // placeholder для кода верификации
};
// Рендерим компонент в статичный HTML
var htmlOutput = '<!DOCTYPE html>' +
    (0, server_1.renderToStaticMarkup)(<VerificationEmail_1.default userName={testData.userName} verificationCode={testData.verificationCode}/>);
// Определяем папку, куда будем сохранять сгенерированные шаблоны (например, "static-templates")
var outputDir = path_1.default.join(process.cwd(), 'static-templates');
// Если папки нет – создаём её
if (!fs_1.default.existsSync(outputDir)) {
    fs_1.default.mkdirSync(outputDir);
}
// Записываем HTML в файл (например, VerificationEmail.html)
var outputFilePath = path_1.default.join(outputDir, 'VerificationEmail.html');
fs_1.default.writeFileSync(outputFilePath, htmlOutput);
console.log("Template generated successfully: ".concat(outputFilePath));
