package logger

import (
	"io"
	"log"
	"os"

	"github.com/fatih/color"
)

type Logger struct{}

func (logger *Logger) Warn(v ...any) {
	warnColor := color.New(color.FgYellow).SprintFunc()
	warnLog := log.New(getColorizedWriter(os.Stdout, warnColor), "[WARN]\t", log.Ldate|log.Ltime)
	warnLog.Println(warnColor(v))
}

func (logger *Logger) Error(v ...any) {
	errorColor := color.New(color.FgRed).SprintFunc()
	errorLog := log.New(getColorizedWriter(os.Stdout, errorColor), "[ERROR ❌ ]\t", log.Ldate|log.Ltime|log.Lshortfile)
	errorLog.Println(errorColor(v))
}

func (logger *Logger) Info(v ...any) {
	infoColor := color.New(color.FgGreen).SprintFunc()
	infoLog := log.New(getColorizedWriter(os.Stdout, infoColor), "[INFO]\t", log.Ldate|log.Ltime)
	infoLog.Println(infoColor(v))
}

func (logger *Logger) Debug(v ...any) {
	debugColor := color.New(color.FgCyan).SprintFunc()
	deubgLog := log.New(getColorizedWriter(os.Stdout, debugColor), "[DEBUG]\t", log.Ldate|log.Ltime)
	deubgLog.Println(debugColor(v))
}

func getColorizedWriter(w io.Writer, colorFunc func(a ...interface{}) string) io.Writer {
	return colorWriter{w, colorFunc}
}

type colorWriter struct {
	writer    io.Writer
	colorFunc func(a ...interface{}) string
}

func (cw colorWriter) Write(p []byte) (n int, err error) {
	coloredContent := cw.colorFunc(string(p))
	return cw.writer.Write([]byte(coloredContent))
}
