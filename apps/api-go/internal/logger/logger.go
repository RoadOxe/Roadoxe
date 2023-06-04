package logger

import (
	"io"
	"log"
	"os"
	"runtime"

	"github.com/fatih/color"
)

type Logger struct{}

func (logger *Logger) Warn(v ...interface{}) {
	warnColor := color.New(color.FgYellow).SprintFunc()
	warnLog := log.New(getColorizedWriter(os.Stdout, warnColor), "[WARN]\t", log.Ldate|log.Ltime)
	warnLog.Output(2, warnColor(v...))
}

func (logger *Logger) Error(v ...interface{}) {
	errorColor := color.New(color.FgRed).SprintFunc()
	errorLog := log.New(getColorizedWriter(os.Stdout, errorColor), "[ERROR ❌ ]\t", log.Ldate|log.Ltime|log.Lshortfile)
	errorLog.Output(2, errorColor(v...))
}

func (logger *Logger) Info(v ...interface{}) {
	infoColor := color.New(color.FgGreen).SprintFunc()
	infoLog := log.New(getColorizedWriter(os.Stdout, infoColor), "[INFO]\t", log.Ldate|log.Ltime)
	infoLog.Output(2, infoColor(v...))
}

func (logger *Logger) Debug(v ...interface{}) {
	debugColor := color.New(color.FgCyan).SprintFunc()
	debugLog := log.New(getColorizedWriter(os.Stdout, debugColor), "[DEBUG]\t", log.Ldate|log.Ltime)
	debugLog.Output(2, debugColor(v...))
}

func getColorizedWriter(w io.Writer, colorFunc func(...interface{}) string) io.Writer {
	return colorWriter{w, colorFunc}
}

type colorWriter struct {
	writer    io.Writer
	colorFunc func(...interface{}) string
}

func (cw colorWriter) Write(p []byte) (n int, err error) {
	coloredContent := cw.colorFunc(string(p))
	return cw.writer.Write([]byte(coloredContent))
}

func (logger *Logger) LogWithCaller(log *log.Logger, v ...interface{}) {
	pc, file, line, ok := runtime.Caller(2)
	if ok {
		funcName := runtime.FuncForPC(pc).Name()
		v = append([]interface{}{file, line, funcName}, v...)
	}
	log.Println(v...)
}
