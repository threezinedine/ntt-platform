package common

import (
	log "github.com/sirupsen/logrus"
)

type LogrusLogger struct {
}

func NewLogrusLogger() *LogrusLogger {
	log.SetFormatter(&log.JSONFormatter{
		DisableTimestamp: true,
	})
	return &LogrusLogger{}
}

func (l *LogrusLogger) Info(msg string, args ...interface{}) {
	log.WithFields(log.Fields{"args": args}).Info(msg)
}

func (l *LogrusLogger) Error(msg string, args ...interface{}) {
	log.WithFields(log.Fields{"args": args}).Error(msg)
}

func (l *LogrusLogger) Warn(msg string, args ...interface{}) {
	log.WithFields(log.Fields{"args": args}).Warn(msg)
}

func (l *LogrusLogger) Debug(msg string, args ...interface{}) {
	log.WithFields(log.Fields{"args": args}).Debug(msg)
}

func (l *LogrusLogger) Fatal(msg string, args ...interface{}) {
	log.WithFields(log.Fields{"args": args}).Fatal(msg)
}
