package common

import "os"

type Logger interface {
	Info(msg string, args ...interface{})
	Error(msg string, args ...interface{})
	Warn(msg string, args ...interface{})
	Debug(msg string, args ...interface{})
	Fatal(msg string, args ...interface{})
}

type SubContext interface {
	Init()
	Close()
}

type Context struct {
	Logger      Logger
	SubContexts map[string]SubContext
	IdService   IdService
}

func (c *Context) GetSubContext(name string) SubContext {
	subContext, ok := c.SubContexts[name]

	if !ok {
		c.Logger.Error("SubContext not found: %s", name)
		os.Exit(2)
	}

	return subContext
}

func (c *Context) AddSubContext(name string, subContext SubContext) {
	if c.SubContexts == nil {
		c.SubContexts = make(map[string]SubContext)
	}

	c.SubContexts[name] = subContext
}

func (c *Context) Init() {
	for _, subContext := range c.SubContexts {
		subContext.Init()
	}
}

func (c *Context) Close() {
	for _, subContext := range c.SubContexts {
		subContext.Close()
	}
}
